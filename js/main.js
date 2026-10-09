// =====================================================================
//  Logika strony: renderowanie treści z js/data.js, języki, nawigacja,
//  intro i uruchomienie efektów. Treść edytujesz w js/data.js.
// =====================================================================

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const STORAGE_KEY = "portfolio-lang";

  const ICONS = {
    "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    pen: '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    network: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    ship: '<path d="M2 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M4 17 3 12h18l-2 5"/><path d="M7 12V8h10v4"/><path d="M10 8V5h4v3"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  };

  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  let lang = initialLang();

  function initialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && I18N[saved]) return saved;
    } catch (_) { /* brak dostępu do localStorage */ }
    return /^pl\b/i.test(navigator.language || "") ? "pl" : "en";
  }

  // Tekst w aktualnym języku: przyjmuje napis, tablicę albo { pl, en }.
  const tr = (value) => {
    if (value == null || typeof value !== "object" || Array.isArray(value)) return value ?? "";
    return value[lang] ?? value.pl ?? "";
  };

  // Napis interfejsu z I18N, np. dict("nav.about").
  const dict = (path) => path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), I18N[lang]);

  // ---------- Dzielenie tekstu na słowa i litery (do animacji) ----------

  function splitWords(el, text) {
    el.innerHTML = String(text).split(/\s+/)
      .map((word, i) => `<span class="w"><span style="--wi: ${i}">${esc(word)}</span></span>`)
      .join(" ");
  }

  function splitChars(el, text) {
    let ci = 0;
    const chars = Array.from(String(text))
      .map((ch) => (ch === " " ? " " : `<span class="ch" style="--ci: ${ci++}">${esc(ch)}</span>`))
      .join("");
    el.innerHTML = `<span class="sr-only">${esc(text)}</span><span class="line" aria-hidden="true">${chars}</span>`;
  }

  // Słowa w {klamrach} dostają kolor akcentu.
  function splitStatement(el, text) {
    el.innerHTML = String(text).split(/\s+/).map((word) => {
      const m = word.match(/^\{(.+?)\}(.*)$/);
      const inner = m ? `<span class="accent-word">${esc(m[1])}</span>${esc(m[2])}` : esc(word);
      return `<span class="sw">${inner}</span>`;
    }).join(" ");
  }

  // ---------- Makiety projektów ----------

  const MOCKS = {
    ferry: (m) => `
      <div class="mock">
        <div class="mock-bar"><i></i><i></i><i></i><span>${esc(m.url)}</span></div>
        <div class="mf-body">
          <div class="mf-route">
            <div class="mf-port"><b>GDA</b><small>Gdańsk</small></div>
            <div class="mf-line">
              <svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M0 22 Q 25 8 50 22 T 100 22 T 150 22 T 200 22"/></svg>
              <span class="mf-ship">${icon("ship")}</span>
            </div>
            <div class="mf-port right"><b>NYN</b><small>Nynäshamn</small></div>
          </div>
          <div class="mf-fields">
            <div class="mock-card"><small>${esc(m.date)}</small><b>12.06.2026</b></div>
            <div class="mock-card"><small>${esc(m.pax)}</small><b>${esc(m.paxVal)}</b></div>
            <div class="mock-card"><small>${esc(m.cabin)}</small><b>${esc(m.cabinVal)}</b></div>
          </div>
          <div class="mf-roles"><span>${esc(m.client)}</span><span>${esc(m.staff)}</span><span>${esc(m.admin)}</span></div>
          <div class="mf-pay">
            <span class="mf-pay-fill"></span>
            <span class="mf-pay-label a">${icon("lock")}${esc(m.pay)}</span>
            <span class="mf-pay-label b">${icon("check")}${esc(m.paid)}</span>
          </div>
        </div>
      </div>`,

    finance: (m) => {
      const bars = [55, 72, 40, 88, 64, 96, 70].map((v, k) => `<i style="--v: ${v}%; --k: ${k}"></i>`).join("");
      return `
      <div class="mock">
        <div class="mock-bar"><i></i><i></i><i></i><span>smartsaver · dashboard</span></div>
        <div class="ms-body">
          <div class="ms-side"><i class="on"></i><i></i><i></i><i></i><i></i></div>
          <div class="ms-main">
            <div class="mock-card ms-balance"><small>${esc(m.balance)}</small><b>12 480 zł</b><span class="ms-up">▲ 4,2%</span></div>
            <div class="mock-card ms-goal"><small>${esc(m.goal)}</small><div class="ms-progress"><span></span></div><b>68%</b></div>
            <div class="mock-card"><small>${esc(m.spending)}</small><div class="ms-bars">${bars}</div></div>
            <div class="mock-card ms-donut-card">
              <div class="ms-donut"></div>
              <ul class="ms-legend">
                <li style="--c: hsl(var(--h), 80%, 68%)">${esc(m.food)}</li>
                <li style="--c: hsl(calc(var(--h) - 60), 80%, 65%)">${esc(m.transport)}</li>
                <li style="--c: hsl(175, 70%, 60%)">${esc(m.fun)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    },

    quiz: (m) => `
      <div class="mq-wrap">
        <div class="mq-phone">
          <div class="mq-notch"></div>
          <div class="mq-screen">
            <div class="mq-head"><span>${esc(m.category)}</span><span>4/10</span></div>
            <div class="mq-progress"><span></span></div>
            <p class="mq-q">${esc(m.question)}</p>
            <ul class="mq-answers"><li>A. HTTP</li><li class="ok">B. TCP</li><li>C. IP</li><li>D. Ethernet</li></ul>
            <div class="mq-score"><span>${esc(m.score)}</span><b>3 / 3</b></div>
          </div>
        </div>
        <span class="mq-float f1">GET /api/questions <em>200</em></span>
        <span class="mq-float f2">PostgreSQL <em>●</em></span>
      </div>`,

    shop: (m) => {
      const products = [["#f97316", "#facc15", 89], ["#ec4899", "#8b5cf6", 129], ["#22d3ee", "#3b82f6", 59]]
        .map(([a, b, price]) => `<div class="mw-product"><div class="mw-img" style="--a: ${a}; --b: ${b}"></div><i></i><b>${price} zł</b></div>`)
        .join("");
      return `
      <div class="mock">
        <div class="mock-bar"><i></i><i></i><i></i><span>${lang === "pl" ? "sklep-klienta.pl" : "client-store.com"}</span></div>
        <div class="mw-body">
          <div class="mw-nav">
            <span class="mw-logo">Shop</span>
            <div class="mw-langs"><span>PL</span><span>EN</span><span>DE</span></div>
            <span class="mw-cart">${icon("cart")}<em>2</em></span>
          </div>
          <div class="mw-hero"><div class="mw-lines"><i></i><i></i><i></i></div><span class="mw-btn">${esc(m.buy)}</span></div>
          <div class="mw-grid">${products}</div>
        </div>
      </div>`;
    },
  };

  // ---------- Renderowanie treści ----------

  function injectIcons() {
    $$("[data-icon]").forEach((el) => { el.outerHTML = icon(el.dataset.icon); });
  }

  function applyProfile() {
    $$("[data-profile]").forEach((el) => { el.textContent = PROFILE[el.dataset.profile] ?? ""; });
    $("#contact-email").href = `mailto:${PROFILE.email}`;
    $("#year").textContent = new Date().getFullYear();
    if (PROFILE.cv) {
      const cv = $("#cv-btn");
      cv.href = PROFILE.cv;
      cv.hidden = false;
    }
  }

  function renderHeroName() {
    const words = PROFILE.name.split(/\s+/);
    let i = 0;
    const lines = words.map((word, li) => {
      const chars = Array.from(word).map((ch) => `<span class="char" style="--i: ${i++}">${esc(ch)}</span>`).join("");
      const dot = li === words.length - 1 ? `<span class="char dot" style="--i: ${i++}">.</span>` : "";
      return `<span class="line${li > 0 ? " outline" : ""}">${chars}${dot}</span>`;
    }).join("");
    $("#hero-name").innerHTML = `<span class="sr-only">${esc(PROFILE.name)}</span><span aria-hidden="true">${lines}</span>`;
  }

  function renderSocials() {
    const links = [
      PROFILE.github && { href: PROFILE.github, label: "GitHub", icon: "github" },
      PROFILE.linkedin && { href: PROFILE.linkedin, label: "LinkedIn", icon: "linkedin" },
      PROFILE.email && { href: `mailto:${PROFILE.email}`, label: "E-mail", icon: "mail" },
    ].filter(Boolean);
    const html = links.map((l) => {
      const external = l.href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<a class="icon-link" href="${esc(l.href)}" aria-label="${l.label}" title="${l.label}" data-magnetic="0.4"${external}>${icon(l.icon)}</a>`;
    }).join("");
    $$("[data-socials]").forEach((el) => { el.innerHTML = html; });
  }

  function renderMarquee() {
    MARQUEE.forEach((row, i) => {
      const el = $(`#marquee-${i + 1}`);
      if (el) el.innerHTML = row.map((t) => `<span class="marquee-item">${esc(t)}</span>`).join("").repeat(4);
    });
  }

  function applyTexts() {
    $$("[data-i18n]").forEach((el) => {
      const value = dict(el.dataset.i18n);
      if (value == null || typeof value === "object") return;
      if (el.hasAttribute("data-split")) splitWords(el, value);
      else if (el.hasAttribute("data-words")) splitStatement(el, value);
      else if (el.hasAttribute("data-chars")) splitChars(el, value);
      else el.innerHTML = value;
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const value = dict(el.dataset.i18nAria);
      if (value != null) el.setAttribute("aria-label", value);
    });

    document.documentElement.lang = lang;
    document.title = `${PROFILE.name} | ${dict("meta.role")}`;
    $('meta[name="description"]').setAttribute("content", dict("meta.description"));
    $("#badge-text").textContent = dict("contact.badge");
    fitBadge();
    // widoczne błędy formularza też zmieniają język
    $$(".field-error").forEach((el) => { if (el.dataset.errorKey) el.textContent = dict(el.dataset.errorKey); });
    $$("[data-lang]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang)));
  }

  // Rozciąga napis na okrągłej plakietce tak, żeby obiegał całe koło.
  function fitBadge() {
    const path = $("#badge-text");
    const text = path.parentNode;
    text.style.letterSpacing = "0px";
    const length = path.getComputedTextLength();
    const chars = path.textContent.length;
    if (length > 0 && chars) text.style.letterSpacing = `${((2 * Math.PI * 80 - length) / chars).toFixed(2)}px`;
  }

  function renderFacts() {
    $("#facts").innerHTML = FACTS.map((f) =>
      `<div class="fact"><dt>${esc(tr(f.label))}</dt><dd>${esc(tr(f.value))}</dd></div>`
    ).join("");
  }

  let statsCounted = false;

  function renderStats() {
    $("#stats").innerHTML = STATS.map((s) => `
      <div class="stat">
        <span class="stat-value" data-count="${s.value}">${statsCounted ? s.value : 0}</span>
        <span class="stat-label">${esc(tr(s.label))}</span>
      </div>`
    ).join("");
  }

  function renderSkills() {
    $("#bento").innerHTML = SKILLS.map((s) => `
      <div class="bento-card spot">
        <div class="bento-icon">${icon(s.icon)}</div>
        <h4>${esc(tr(s.title))}</h4>
        <p>${esc(tr(s.text))}</p>
        <ul class="chips">${s.items.map((item) => `<li class="chip">${esc(tr(item))}</li>`).join("")}</ul>
      </div>`
    ).join("");
  }

  function renderProjects() {
    $("#projects-stack").innerHTML = PROJECTS.map((p, i) => {
      const title = tr(p.title);
      const num = String(i + 1).padStart(2, "0");
      const visual = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(title)}" loading="lazy">`
        : (MOCKS[p.mock] ? MOCKS[p.mock](dict(`mock.${p.mock}`) || {}) : "");

      const links = [
        p.github && `<a class="project-link" href="${esc(p.github)}" target="_blank" rel="noopener">${icon("github")}<span>${esc(dict("projects.code"))}</span>${icon("arrow-up-right")}</a>`,
        p.live && `<a class="project-link" href="${esc(p.live)}" target="_blank" rel="noopener">${icon("external")}<span>${esc(dict("projects.live"))}</span>${icon("arrow-up-right")}</a>`,
      ].filter(Boolean).join("");
      const note = !links && p.note ? `<span class="project-note">${icon("lock")}${esc(tr(p.note))}</span>` : "";

      const href = p.live || p.github;
      const tag = href ? "a" : "div";
      const attrs = href
        ? ` href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(title)}: ${esc(dict("projects.view"))}"`
        : ' aria-hidden="true"';

      return `
        <article class="project" style="--h: ${p.hue ?? 175}; --i: ${i}">
          <div class="project-info" data-stagger>
            <div class="project-meta"><span class="project-num">${num}</span><span>${esc(tr(p.category))}</span></div>
            <h3 class="project-title">${esc(title)}</h3>
            <p class="project-desc">${esc(tr(p.description))}</p>
            <ul class="project-highlights">${tr(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
            <ul class="tags">${(p.tags || []).map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
            <div class="project-links">${links}${note}</div>
          </div>
          <${tag} class="project-visual" data-tilt="10" data-reveal="scale"${attrs}>
            <div class="project-visual-inner">${visual}</div>
          </${tag}>
          <div class="project-shade" aria-hidden="true"></div>
        </article>`;
    }).join("");
  }

  let filter = "all";

  function renderTimeline() {
    $("#timeline").innerHTML = EXPERIENCE.map((item) => `
      <li class="tl-item${filter !== "all" && item.type !== filter ? " is-dimmed" : ""}" data-type="${esc(item.type)}">
        <div class="tl-date">${esc(tr(item.date))}</div>
        <span class="tl-dot" aria-hidden="true"></span>
        <div class="tl-card">
          <span class="tl-type ${esc(item.type)}">${icon(item.type === "edu" ? "book" : "briefcase")}${esc(dict(`experience.${item.type}`))}</span>
          <h3>${esc(tr(item.title))}</h3>
          <p class="tl-place">${esc(tr(item.place))}</p>
          <p class="tl-desc">${esc(tr(item.description))}</p>
        </div>
      </li>`
    ).join("");
  }

  function renderCerts() {
    $("#certs").innerHTML = CERTS.map((c) => `
      <div class="cert spot">
        <span class="cert-badge">${esc(c.badge)}</span>
        <div><h4>${esc(tr(c.name))}</h4><p>${esc(tr(c.issuer))} · ${esc(c.date)}</p></div>
      </div>`
    ).join("");
  }

  // ---------- Animacje wejścia (przy przewijaniu) ----------

  let revealObserver = null;
  let revealReady = false;

  function indexStagger(el) {
    Array.from(el.children).forEach((child, i) => child.style.setProperty("--si", i));
  }

  function reveal(el, instant) {
    el.classList.add("is-inview");
    if (instant) el.classList.add("is-done");
    else setTimeout(() => el.classList.add("is-done"), 2200);
  }

  // instantIfSeen: elementy już widoczne lub przewinięte pokazują się od razu (np. po zmianie języka)
  function observeReveals(root, instantIfSeen = false) {
    $$("[data-reveal], [data-stagger]", root).forEach((el) => {
      if (el.dataset.observed) return;
      el.dataset.observed = "1";
      if (!revealObserver || (instantIfSeen && el.getBoundingClientRect().top < window.innerHeight)) {
        reveal(el, true);
        return;
      }
      revealObserver.observe(el);
    });
  }

  function initReveal() {
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealObserver.unobserve(entry.target);
          reveal(entry.target, false);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }
    $$("[data-stagger]").forEach(indexStagger);
    observeReveals(document);
    revealReady = true;
  }

  function initCounters() {
    const stats = $("#stats");
    const run = () => {
      if (statsCounted) return;
      statsCounted = true;
      $$(".stat-value", stats).forEach((el) => Effects.countUp(el, Number(el.dataset.count)));
    };
    if (!("IntersectionObserver" in window)) return run();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { io.disconnect(); run(); }
    }, { threshold: 0.4 });
    io.observe(stats);
  }

  // ---------- Nawigacja ----------

  function initHeader() {
    const header = $("#header");
    const bar = $("#progress");
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", y > 10);
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initActiveNav() {
    const links = $$(".nav-links a");
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        byId.get(entry.target.id)?.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((section) => io.observe(section));
  }

  function initMenu() {
    const btn = $("#menu-btn");
    const setOpen = (open) => {
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  let movePill = () => {};

  function initFilters() {
    const wrap = $("#tl-filters");
    const pill = $(".tl-pill", wrap);
    const buttons = $$("[data-filter]", wrap);

    movePill = () => {
      const active = buttons.find((b) => b.dataset.filter === filter);
      if (!active) return;
      pill.style.left = `${active.offsetLeft}px`;
      pill.style.width = `${active.offsetWidth}px`;
    };

    buttons.forEach((btn) => btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$(".tl-item").forEach((item) => item.classList.toggle("is-dimmed", filter !== "all" && item.dataset.type !== filter));
      movePill();
    }));

    window.addEventListener("resize", movePill);
    document.fonts?.ready.then(movePill);
    movePill();
  }

  function initCopyEmail() {
    const btn = $("#copy-btn");
    const label = $("#copy-label");
    let timer;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(PROFILE.email);
      } catch (_) {
        const area = document.createElement("textarea");
        area.value = PROFILE.email;
        area.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (__) { /* ignorujemy */ }
        area.remove();
      }
      label.textContent = dict("contact.copied");
      btn.classList.add("is-copied");
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = dict("contact.copy");
        btn.classList.remove("is-copied");
      }, 2000);
    });
  }

  // ---------- Formularz kontaktowy ----------

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function initContactForm() {
    const form = $("#contact-form");
    const success = $("#form-success");
    const submit = $("#form-submit");
    const status = $("#form-status");
    const counter = $("#char-count");
    const field = (name) => form.elements.namedItem(name);

    const rules = {
      name: (v) => v.trim().length >= 2,
      email: (v) => EMAIL_RE.test(v.trim()),
      message: (v) => v.trim().length >= 10,
    };

    const showError = (name, invalid) => {
      const input = field(name);
      const error = $(`#f-${name}-error`);
      input.setAttribute("aria-invalid", String(invalid));
      input.closest(".field").classList.toggle("is-invalid", invalid);
      error.dataset.errorKey = invalid ? `form.errors.${name}` : "";
      error.textContent = invalid ? dict(`form.errors.${name}`) : "";
    };

    const validate = () => {
      let firstInvalid = null;
      Object.keys(rules).forEach((name) => {
        const ok = rules[name](field(name).value);
        showError(name, !ok);
        if (!ok && !firstInvalid) firstInvalid = field(name);
      });
      firstInvalid?.focus();
      return !firstInvalid;
    };

    Object.keys(rules).forEach((name) => {
      const input = field(name);
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true" && rules[name](input.value)) showError(name, false);
      });
      input.addEventListener("blur", () => { if (input.value) showError(name, !rules[name](input.value)); });
    });

    const message = field("message");
    const updateCounter = () => { counter.textContent = `${message.value.length} / ${message.maxLength}`; };
    message.addEventListener("input", updateCounter);
    updateCounter();

    const setSending = (on) => {
      submit.disabled = on;
      submit.classList.toggle("is-sending", on);
      $(".form-submit-label", submit).textContent = dict(on ? "form.sending" : "form.send");
    };

    const showStatus = (key) => {
      status.textContent = key ? dict(key) : "";
      status.classList.toggle("is-error", !!key);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      showStatus("");
      if (field("_honey").value) return; // wypełnione przez bota
      if (!validate()) return;

      const name = field("name").value.trim();
      const topic = dict(`form.topics.${field("topic").value}`);
      const payload = {
        name,
        email: field("email").value.trim(),
        topic,
        message: message.value.trim(),
        _subject: `${CONTACT_FORM.subject} · ${topic} · ${name}`,
        _template: "table",
        _captcha: "false",
      };

      setSending(true);
      try {
        const res = await fetch(CONTACT_FORM.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && String(data.success) === "true") {
          form.reset();
          updateCounter();
          form.hidden = true;
          success.hidden = false;
          $("#form-again").focus();
        } else {
          showStatus(/activat/i.test(data.message || "") ? "form.activation" : "form.failed");
        }
      } catch (_) {
        showStatus("form.failed");
      } finally {
        setSending(false);
      }
    });

    $("#form-again").addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
      field("name").focus();
    });
  }

  function initClock() {
    const el = $("#clock");
    const update = () => {
      el.textContent = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
        timeZone: PROFILE.timezone || "Europe/Warsaw",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    };
    update();
    setInterval(update, 1000);
  }

  // ---------- Nagłówek: zmieniające się role i terminal ----------

  const terminal = Effects.createTerminal($("#terminal"));
  let heroStarted = false;
  let roleTimer;

  function startRoles() {
    clearTimeout(roleTimer);
    const el = $("#role-text");
    const roles = ROLES[lang] || [];
    $("#roles-sr").textContent = roles.join(", ");
    if (!roles.length) return;
    let i = 0;
    const next = () => {
      Effects.scramble(el, roles[i]);
      i = (i + 1) % roles.length;
      roleTimer = setTimeout(next, 3400);
    };
    next();
  }

  function startHero() {
    if (heroStarted) return;
    heroStarted = true;
    startRoles();
    terminal.run(dict("terminal"));
  }

  // ---------- Intro ----------

  function runPreloader() {
    const pre = $("#preloader");
    const root = document.documentElement;
    let skip = false;
    try {
      if (sessionStorage.getItem("portfolio-intro")) skip = true;
      sessionStorage.setItem("portfolio-intro", "1");
    } catch (_) { /* ignorujemy */ }

    if (!pre || skip) {
      pre?.remove();
      // dwie klatki, żeby przeglądarka zdążyła narysować stan początkowy animacji
      return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => {
        root.classList.add("is-loaded");
        resolve();
      })));
    }

    document.body.style.overflow = "hidden";
    setTimeout(() => { document.body.style.overflow = ""; }, 5000);

    return new Promise((resolve) => {
      const bar = $("#preloader-bar");
      const count = $("#preloader-count");
      const duration = 1500;
      const t0 = performance.now();

      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        count.textContent = String(Math.round(eased * 100)).padStart(2, "0");
        bar.style.transform = `scaleX(${eased})`;
        if (p < 1) return requestAnimationFrame(tick);

        pre.classList.add("is-done");
        document.body.style.overflow = "";
        setTimeout(() => { root.classList.add("is-loaded"); resolve(); }, 380);
        setTimeout(() => pre.remove(), 1500);
      };
      requestAnimationFrame(tick);
    });
  }

  // ---------- Języki ----------

  function renderAll() {
    applyTexts();
    renderFacts();
    renderStats();
    renderSkills();
    renderProjects();
    renderTimeline();
    renderCerts();
    $$("[data-stagger]").forEach(indexStagger);
    if (revealReady) observeReveals($("#projects-stack"), true);
    movePill();
  }

  function initLangSwitch() {
    $$("[data-lang]").forEach((btn) => btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      lang = btn.dataset.lang;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* ignorujemy */ }

      document.body.classList.add("is-switching");
      setTimeout(() => {
        renderAll();
        window.ScrollFX.refresh();
        if (heroStarted) {
          startRoles();
          terminal.run(dict("terminal"));
        }
        document.body.classList.remove("is-switching");
      }, 200);
    }));
  }

  // ---------- Start ----------

  injectIcons();
  applyProfile();
  renderHeroName();
  renderSocials();
  renderMarquee();
  renderAll();
  initReveal();
  initCounters();
  initHeader();
  initActiveNav();
  initMenu();
  initFilters();
  initLangSwitch();
  initCopyEmail();
  initContactForm();
  initClock();
  Effects.init();
  window.ScrollFX.init();
  document.fonts?.ready.then(fitBadge);

  runPreloader().then(startHero);
  setTimeout(startHero, 4700);
})();
