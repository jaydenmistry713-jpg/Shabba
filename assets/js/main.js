/* ============================================================
   Cooking with Shabba — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Nav: darken on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var overlay = document.getElementById("overlay");

  function setMenu(open) {
    burger.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger.addEventListener("click", function () {
    setMenu(!burger.classList.contains("is-open"));
  });

  // Close overlay when a link is tapped
  overlay.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Staggered scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      // Group simultaneously-entering elements and stagger them
      var visible = entries.filter(function (en) { return en.isIntersecting; });
      visible.forEach(function (entry, i) {
        var el = entry.target;
        setTimeout(function () { el.classList.add("is-visible"); }, i * 110);
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Enquiry form: AJAX submit + inline success ---------- */
  var form = document.querySelector("form[name='enquiry']");
  var success = document.getElementById("form-success");

  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Let native browser validation surface for required fields
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var btn = form.querySelector(".form__submit");
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      var data = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Submission failed");
          form.hidden = true;
          success.hidden = false;
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
          alert("Something went wrong sending your enquiry. Please try again, or email Cookingwithshabba@outlook.com.");
        });
    });
  }

  /* ---------- Reviews: auto-rotating carousel ----------
     The progress bar drives the rotation: it fills over the slide's
     interval (duration set in CSS) and its `animationend` advances to the
     next slide, so the indicator and the timing can never drift apart.
     Pausing = freezing the bar's animation-play-state. */
  var stage = document.getElementById("reviews-stage");
  var track = document.getElementById("reviews-track");
  var dotsWrap = document.getElementById("reviews-dots");
  var bar = document.getElementById("reviews-bar");

  if (stage && track && dotsWrap) {
    var slides = track.querySelectorAll(".review");
    var reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var autoRotate = bar && !reduceMotion && slides.length > 1;
    var current = 0;

    // Build a dot per slide
    var dots = [];
    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.className = "reviews__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("type", "button");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Review " + (i + 1) + " of " + slides.length);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", function () { show(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function show(n) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      dots[current].setAttribute("aria-selected", "false");
      current = (n + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
      dots[current].setAttribute("aria-selected", "true");
      runBar();
    }

    // Restart the progress fill from zero for the current slide
    function runBar() {
      if (!autoRotate) return;
      bar.classList.remove("is-running");
      void bar.offsetWidth; // force reflow so the animation replays
      bar.style.animationPlayState = "running";
      bar.classList.add("is-running");
    }
    function pause() { if (autoRotate) bar.style.animationPlayState = "paused"; }
    function resume() { if (autoRotate) bar.style.animationPlayState = "running"; }

    if (autoRotate) {
      bar.addEventListener("animationend", function () { show(current + 1); });

      // Pause while the visitor is reading / interacting
      stage.addEventListener("mouseenter", pause);
      stage.addEventListener("mouseleave", resume);
      stage.addEventListener("focusin", pause);
      stage.addEventListener("focusout", resume);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) { pause(); } else { resume(); }
      });

      runBar(); // kick off the first slide's timer
    }
  }

  /* ---------- Cookie notice ---------- */
  var cookie = document.getElementById("cookie");
  var accept = document.getElementById("cookie-accept");
  var KEY = "cws-cookie-consent";

  try {
    if (!localStorage.getItem(KEY)) {
      // small delay so it doesn't fight the hero entrance
      setTimeout(function () { cookie.hidden = false; }, 1200);
    }
  } catch (err) {
    cookie.hidden = false;
  }

  accept.addEventListener("click", function () {
    try { localStorage.setItem(KEY, "1"); } catch (err) {}
    cookie.hidden = true;
  });
})();
