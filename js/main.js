/* ==========================================================================
   GICA & VHO — The Ultimate Co-Op Campaign
   main.js — Shared UI behaviour (navigation, opening screen, helpers)
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. PROGRESSIVE ENHANCEMENT — show the Opening Screen only when JS runs
     ------------------------------------------------------------------ */
  document.documentElement.classList.add("js");

  // Lock body scroll while the Opening Screen is visible.
  var openingInit = document.getElementById("opening");
  if (openingInit && !openingInit.hasAttribute("hidden")) {
    document.body.classList.add("u-overflow-hidden");
  }

  /* Press Start keyboard support — Enter / Space activate on desktop */
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") { return; }
    var opening = document.getElementById("opening");
    if (!opening || opening.hasAttribute("hidden")) { return; }
    // Only when focus is on the Press Start control or within the opening
    var target = event.target;
    if (target === document.body || target.closest("#opening")) {
      event.preventDefault();
      var start = document.querySelector("[data-press-start]");
      if (start) { start.click(); }
    }
  });

  /* ------------------------------------------------------------------
     2. OPENING SCREEN ("Press Start")
     Handles the transition to the Home / Quest Hub.
     Link fallback: if JS fails, the <a href="#home-intro"> still works.
     ------------------------------------------------------------------ */
  var pressStart = document.querySelector("[data-press-start]");
  if (pressStart) {
    pressStart.addEventListener("click", function (event) {
      event.preventDefault();

      var opening = document.getElementById("opening");
      if (!opening) { return; }

      var target = pressStart.getAttribute("href") || "#home-intro";

      // Respect reduced motion: skip straight to hidden.
      if (prefersReducedMotion) {
        opening.setAttribute("hidden", "");
        document.body.classList.remove("u-overflow-hidden");
        window.location.hash = target;
        return;
      }

      opening.classList.add("is-leaving");
      document.body.classList.add("u-overflow-hidden");

      window.setTimeout(function () {
        opening.setAttribute("hidden", "");
        document.body.classList.remove("u-overflow-hidden");
        pressStart.setAttribute("tabindex", "-1");
        var targetEl = document.querySelector(target);
        if (targetEl) {
          targetEl.setAttribute("tabindex", "-1");
          targetEl.focus({ preventScroll: true });
        }
        window.location.hash = target.replace(/^#/, "");
      }, 620);
    });
  }

  /* ------------------------------------------------------------------
     3. DRAWER NAVIGATION (hamburger menu)
     ------------------------------------------------------------------ */
  var toggle = document.querySelector("[data-drawer-toggle]");
  var drawer = document.querySelector(".drawer");
  var drawerBackdrop = document.querySelector(".drawer-backdrop");

  function setDrawer(open) {
    if (!drawer || !toggle) { return; }
    drawer.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (drawerBackdrop) {
      drawerBackdrop.classList.toggle("is-visible", open);
    }
    if (open) {
      // Focus first link for keyboard users
      var first = drawer.querySelector("a, button");
      if (first) { first.focus(); }
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setDrawer(!isOpen);
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", function () { setDrawer(false); });
  }

  // Close drawer when a link is activated (mobile UX)
  if (drawer) {
    drawer.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setDrawer(false); }
    });

    // Escape closes drawer
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        setDrawer(false);
        if (toggle) { toggle.focus(); }
      }
    });
  }

  /* Also expose for other scripts (e.g. close on route change) */
  window.WeddingSite = window.WeddingSite || {};
  window.WeddingSite.closeDrawer = function () { setDrawer(false); };

  /* ------------------------------------------------------------------
     4. FLOATING HEARTS (opening & anywhere .floating-hearts sits)
     ------------------------------------------------------------------ */
  document.querySelectorAll(".floating-hearts").forEach(function (container) {
    if (prefersReducedMotion) { return; }
    var count = 12;
    for (var i = 0; i < count; i++) {
      var span = document.createElement("span");
      span.textContent = "♥";
      span.style.left = (Math.random() * 100).toFixed(1) + "%";
      span.style.animationDelay = (Math.random() * 12).toFixed(2) + "s";
      span.style.animationDuration = (9 + Math.random() * 8).toFixed(2) + "s";
      span.style.fontSize = (0.7 + Math.random() * 0.9).toFixed(2) + "rem";
      container.appendChild(span);
    }
  });

  /* ------------------------------------------------------------------
     5. SCROLL REVEAL
     Elements with .reveal fade in when they enter the viewport.
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------
     6. BROKEN IMAGES → graceful fallback (keep container decoration)
     ------------------------------------------------------------------ */
  document.querySelectorAll("img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      img.classList.add("is-broken");
    } else {
      img.addEventListener("error", function () {
        img.classList.add("is-broken");
      }, { once: true });
    }
  });

  /* ------------------------------------------------------------------
     7. DYNAMIC YEAR (footer)
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------
     8. ACTIVE LINK HIGHLIGHT
     Marks the current page in the drawer + bottom nav via aria-current.
     ------------------------------------------------------------------ */
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.indexOf("#") === 0 || href.indexOf("http") === 0) { return; }
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ------------------------------------------------------------------
     9. MUSIC TOGGLE (dummy for this phase; wired in a later phase)
     ------------------------------------------------------------------ */
  var musicToggle = document.querySelector(".music-toggle");
  if (musicToggle) {
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.addEventListener("click", function () {
      var pressed = musicToggle.getAttribute("aria-pressed") === "true";
      musicToggle.setAttribute("aria-pressed", String(!pressed));
    });
  }
})();