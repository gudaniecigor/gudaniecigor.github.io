// =====================================================================
//  Efekty sterowane przewijaniem (biblioteka GSAP + ScrollTrigger).
//  Bez internetu biblioteka się nie wczyta: strona działa wtedy normalnie,
//  tylko bez tych efektów.
// =====================================================================

window.ScrollFX = (() => {
  "use strict";

  const stackQuery = window.matchMedia("(min-width: 1041px) and (min-height: 700px)");
  let ctx = null;

  const available = () => !!(window.gsap && window.ScrollTrigger);

  // Zdanie w "O mnie": słowa rozjaśniają się w miarę przewijania.
  function statement() {
    const words = gsap.utils.toArray("#statement .sw");
    if (!words.length) return;
    gsap.fromTo(words, { opacity: 0.14 }, {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: { trigger: "#statement", start: "top 82%", end: "bottom 42%", scrub: 0.6 },
    });
  }

  // Karty projektów: kolejna nasuwa się na poprzednią, a ta się cofa i ciemnieje.
  function stackCards() {
    if (!stackQuery.matches) return;
    const cards = gsap.utils.toArray(".project");
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const trigger = { trigger: next, start: "top bottom", end: "top 30%", scrub: true };
      gsap.to(card, { scale: 0.93, ease: "none", scrollTrigger: trigger });
      gsap.to(card.querySelector(".project-shade"), { opacity: 0.65, ease: "none", scrollTrigger: { ...trigger } });
    });
  }

  // Oś czasu: linia "rysuje się", a kropki zapalają się po kolei.
  function timeline() {
    const progress = document.querySelector(".tl-progress");
    if (!progress) return;
    gsap.fromTo(progress, { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: "#timeline", start: "top 62%", end: "bottom 62%", scrub: 0.4 },
    });
    gsap.utils.toArray(".tl-item").forEach((item) => {
      ScrollTrigger.create({ trigger: item, start: "top 62%", toggleClass: { targets: item, className: "is-passed" } });
    });
  }

  // Duże numery sekcji w tle przesuwają się wolniej niż treść.
  function parallax() {
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 50;
      gsap.fromTo(el, { y: amount }, {
        y: -amount,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }

  // Nagłówek strony odjeżdża i blednie przy przewijaniu w dół.
  function heroOut() {
    gsap.to(".hero-content", {
      y: -90,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("#hero-visual", {
      y: -150,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  // Wielkie imię w stopce wjeżdża od dołu.
  function footer() {
    gsap.fromTo(".footer-giant", { yPercent: 40, opacity: 0 }, {
      yPercent: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
    });
  }

  function build() {
    ctx = gsap.context(() => {
      statement();
      stackCards();
      timeline();
      parallax();
      heroOut();
      footer();
    });
  }

  function init() {
    if (!available()) return false;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("fx-ready");
    build();

    stackQuery.addEventListener("change", refresh);
    // po wczytaniu czcionek zmieniają się wysokości elementów
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return true;
  }

  // Wywoływane po zmianie języka (treść jest renderowana na nowo).
  function refresh() {
    if (!ctx) return;
    ctx.revert();
    build();
    ScrollTrigger.refresh();
  }

  return { init, refresh };
})();
