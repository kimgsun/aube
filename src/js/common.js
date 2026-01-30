(function () {
  "use strict";

  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    if (!nav || !toggle) return;

    function setAria(open) {
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    }

    toggle.addEventListener("click", function () {
      setAria(nav.classList.toggle("active"));
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("active") && !nav.contains(e.target)) {
        nav.classList.remove("active");
        setAria(false);
      }
    });

    document.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        setAria(false);
      });
    });
  }

  function initReveal(offset) {
    offset = offset || 100;
    function check() {
      var h = window.innerHeight;
      document.querySelectorAll(".reveal").forEach(function (el) {
        if (el.getBoundingClientRect().top < h - offset)
          el.classList.add("active");
      });
    }
    window.addEventListener("scroll", check);
    window.addEventListener("load", check);
    window.runRevealCheck = check;
  }

  function initFilter(opts) {
    var btnSelector = opts.btnSelector;
    var itemSelector = opts.itemSelector;
    var delay = opts.delay || 400;
    var batch = opts.batch !== false;
    var applyFilterName = opts.applyFilterName;
    var reinitName = opts.reinitName;
    var applyFilter;

    function runInit() {
      var btns = document.querySelectorAll(btnSelector);
      if (!btns.length) return;

      applyFilter = function (filter) {
        var items = document.querySelectorAll(itemSelector);
        items.forEach(function (item) {
          item.classList.add("filtering");
        });
        var showItem = function (item) {
          var cat = item.getAttribute("data-category");
          var show = filter === "all" || cat === filter;
          item.classList.toggle("is-hidden", !show);
          item.classList.remove("filtering");
        };
        if (batch) {
          setTimeout(function () {
            items.forEach(showItem);
          }, delay);
        } else {
          items.forEach(function (item) {
            setTimeout(function () {
              showItem(item);
            }, delay);
          });
        }
      };

      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          btns.forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-pressed", "false");
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
          if (applyFilter) applyFilter(btn.getAttribute("data-filter"));
        });
      });
      if (applyFilterName) window[applyFilterName] = applyFilter;
    }

    window[reinitName] = function () {
      if (!applyFilter) return;
      var btns = document.querySelectorAll(btnSelector);
      if (!btns.length) return;
      var active = document.querySelector(btnSelector + ".is-active");
      if (active) {
        btns.forEach(function (b) {
          b.setAttribute("aria-pressed", b === active ? "true" : "false");
        });
        applyFilter(active.getAttribute("data-filter"));
      } else {
        btns[0].classList.add("is-active");
        btns.forEach(function (b, i) {
          b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        });
        applyFilter(btns[0].getAttribute("data-filter") || "all");
      }
    };

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(runInit, 100);
      });
    else setTimeout(runInit, 100);
  }

  window.initFilter = initFilter;

  function init() {
    initNav();
    initReveal();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
