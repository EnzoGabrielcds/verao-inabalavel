/* ============================================================
   DESAFIO VERÃO INABALÁVEL — Interações
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Ano atual no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sombra no header ao rolar ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Menu mobile (abrir/fechar) ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Fade-in ao rolar (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: mostra tudo
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Botões de checkout ----------
     Preparado para receber futuramente o link de checkout.
     Basta definir a constante abaixo com a URL da plataforma
     (Kiwify, Hotmart, etc.) que todos os botões passam a
     redirecionar automaticamente.
  ------------------------------------------------------------ */
  var CHECKOUT_URL = ""; // ex.: "https://pay.kiwify.com.br/seu-produto"

  document.querySelectorAll("[data-checkout]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (CHECKOUT_URL) {
        // Redireciona para o checkout quando a URL estiver definida
        window.location.href = CHECKOUT_URL;
      } else {
        // Enquanto não há link, evita navegação e avisa no console
        e.preventDefault();
        console.log("[v0] Link de checkout ainda não configurado. Defina CHECKOUT_URL em js/script.js.");
      }
    });
  });
});
