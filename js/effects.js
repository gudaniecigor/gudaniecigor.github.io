// =====================================================================
//  Efekty interaktywne: magnetyczne przyciski, przechylanie 3D,
//  świecące ramki, przesuwane paski, sieć w tle, terminal, liczniki.
//  Działają bez zewnętrznych bibliotek.
// =====================================================================

window.Effects = (() => {
  "use strict";

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---------- Tekst "rozszyfrowujący się" ----------

  const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

  function scramble(el, text, { speed = 1 } = {}) {
    cancelAnimationFrame(el._scrambleRaf);
    const from = el.textContent;
    const length = Math.max(from.length, text.length);
    const queue = Array.from({ length }, (_, i) => {
      const start = Math.floor((Math.random() * 16) / speed);
      return { from: from[i] || "", to: text[i] || "", start, end: start + Math.floor((Math.random() * 16) / speed) + 4, glyph: "" };
    });
    let frame = 0;

    return new Promise((resolve) => {
      const update = () => {
        let html = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            html += esc(q.to);
          } else if (frame >= q.start) {
            if (!q.glyph || Math.random() < 0.3) q.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            html += `<span class="glyph">${esc(q.glyph)}</span>`;
          } else {
            html += esc(q.from);
          }
        }
        el.innerHTML = html;
        if (done === queue.length) return resolve();
        frame++;
        el._scrambleRaf = requestAnimationFrame(update);
      };
      update();
    });
  }

  // ---------- Terminal piszący komendy ----------

  function highlight(line) {
    return esc(line).replace(/(&quot;[^&]*?&quot;)(\s*:)?/g, (_, str, colon) =>
      colon ? `<span class="t-key">${str}</span>${colon}` : `<span class="t-str">${str}</span>`
    );
  }

  function createTerminal(el) {
    let token = 0;

    const promptRow = (prompt) => {
      const row = document.createElement("div");
      row.className = "t-row";
      row.innerHTML = `<span class="t-prompt">${esc(prompt)}</span> <span class="t-cmd"></span><span class="t-cursor"></span>`;
      el.appendChild(row);
      return row;
    };

    const outputRow = (line) => {
      const out = document.createElement("div");
      out.className = "t-out" + (line.startsWith("●") ? " hl" : "");
      out.innerHTML = highlight(line);
      el.appendChild(out);
    };

    async function run({ prompt, lines }) {
      const my = ++token;
      el.innerHTML = "";

      for (const step of lines) {
        const row = promptRow(prompt);
        const cmd = row.querySelector(".t-cmd");
        await wait(350);
        for (const ch of step.cmd) {
          if (my !== token) return;
          cmd.textContent += ch;
          await wait(45 + Math.random() * 55);
        }
        await wait(260);
        if (my !== token) return;
        row.querySelector(".t-cursor").remove();
        for (const line of step.out) {
          if (my !== token) return;
          outputRow(line);
          el.scrollTop = el.scrollHeight;
          await wait(70);
        }
        await wait(420);
      }
      if (my === token) promptRow(prompt);
    }

    return { run, stop: () => { token++; } };
  }

  // ---------- Magnetyczne przyciski ----------

  function magnetic() {
    if (!finePointer) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      el.addEventListener("pointerleave", () => { el.style.translate = ""; });
    });
  }

  // ---------- Przechylanie 3D ----------

  function tilt() {
    if (!finePointer) return;
    let current = null;

    const reset = (el) => {
      ["--rx", "--ry", "--gx", "--gy"].forEach((p) => el.style.removeProperty(p));
    };

    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest?.("[data-tilt]");
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const max = parseFloat(el.dataset.tilt) || 8;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * max * 1.3).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
    }, { passive: true });

    document.addEventListener("pointerleave", () => { if (current) reset(current); current = null; });
  }

  // ---------- Świecące ramki za kursorem ----------

  function spotlight() {
    if (!finePointer) return;
    document.addEventListener("pointermove", (e) => {
      const group = e.target.closest?.("[data-spotlight]");
      if (!group) return;
      group.querySelectorAll(".spot").forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }, { passive: true });
  }

  // ---------- Pływające elementy w nagłówku (paralaksa za myszą) ----------

  function heroParallax() {
    if (!finePointer) return;
    const hero = document.getElementById("hero");
    const items = hero ? hero.querySelectorAll("[data-depth]") : [];
    if (!items.length) return;
    hero.addEventListener("pointermove", (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      items.forEach((el) => {
        const d = parseFloat(el.dataset.depth) || 20;
        el.style.translate = `${(-px * d).toFixed(1)}px ${(-py * d).toFixed(1)}px`;
      });
    }, { passive: true });
  }

  // ---------- Paski z technologiami (przyspieszają przy przewijaniu) ----------

  function marquee() {
    const tracks = Array.from(document.querySelectorAll(".marquee-track"));
    if (!tracks.length) return;

    const state = tracks.map((el, i) => ({ el, x: 0, dir: i % 2 ? 1 : -1 }));
    let lastY = window.scrollY;
    let velocity = 0;
    let visible = true;

    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; })
      .observe(tracks[0].closest(".marquee"));

    const loop = () => {
      const y = window.scrollY;
      velocity += (y - lastY - velocity) * 0.12;
      lastY = y;
      if (visible) {
        const boost = clamp(velocity * 0.18, -7, 7);
        const skew = clamp(-velocity * 0.12, -6, 6);
        state.forEach((s) => {
          const half = s.el.scrollWidth / 2;
          if (!half) return;
          s.x += s.dir * (0.7 + boost);
          if (s.x <= -half) s.x += half;
          if (s.x > 0) s.x -= half;
          s.el.style.transform = `translate3d(${s.x.toFixed(2)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
        });
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  // ---------- Sieć w tle nagłówka (węzły, połączenia i "pakiety") ----------

  function network(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const LINK = 130;
    const MOUSE = 170;
    let w = 0, h = 0, nodes = [], packets = [];
    let mouse = { x: -9999, y: -9999 };
    let visible = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = clamp(Math.round((w * h) / 15000), 24, 95);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.5 + 0.7,
      }));
      packets = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE && d > 0) {
          const f = (1 - d / MOUSE) * 0.9;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(94, 234, 212, ${((1 - d / LINK) * 0.28).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE + 40) {
          ctx.strokeStyle = `rgba(125, 211, 252, ${((1 - md / (MOUSE + 40)) * 0.45).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // pakiety danych biegnące po połączeniach
      if (packets.length < 7 && Math.random() < 0.06) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes.find((n) => n !== a && Math.hypot(a.x - n.x, a.y - n.y) < LINK);
        if (b) packets.push({ a, b, t: 0 });
      }
      packets = packets.filter((p) => p.t < 1 && Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y) < LINK + 20);
      for (const p of packets) {
        p.t += 0.018;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = "rgba(94, 234, 212, 0.95)";
        ctx.shadowColor = "rgba(94, 234, 212, 0.9)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      ctx.fillStyle = "rgba(232, 234, 239, 0.55)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      requestAnimationFrame(loop);
    };

    resize();
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });

    const host = canvas.parentElement;
    host.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    }, { passive: true });
    host.addEventListener("pointerleave", () => { mouse = { x: -9999, y: -9999 }; });
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);
    loop();
  }

  // ---------- Liczniki ----------

  function countUp(el, target, duration = 1800) {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(target * (p === 1 ? 1 : eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function init() {
    magnetic();
    tilt();
    spotlight();
    heroParallax();
    marquee();
    network(document.getElementById("network"));
  }

  return { init, scramble, createTerminal, countUp };
})();
