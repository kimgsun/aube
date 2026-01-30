(function () {
  "use strict";

  var mapInitialized = false;

  function createMap() {
    var el = document.getElementById("location-map");
    if (!el || mapInitialized) return;
    if (typeof L === "undefined") {
      alert("지도 라이브러리를 불러올 수 없습니다.");
      return;
    }
    mapInitialized = true;

    var lat = 37.546052;
    var lng = 127.057444;

    var map = L.map("location-map", {
      center: [lat, lng],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(map);
    var icon = L.divIcon({
      className: "custom-marker",
      html: '<div class="marker-pin"></div>',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
    L.marker([lat, lng], { icon: icon })
      .addTo(map)
      .bindPopup(
        '<div class="map-popup"><strong>AUBE</strong><br>오브 성수점<br><small>서울특별시 성동구 성수이로 123-45</small></div>',
      );

    setTimeout(function () {
      map.invalidateSize();
    }, 100);
    setTimeout(function () {
      map.invalidateSize();
    }, 1600);
  }

  function initMap() {
    var el = document.getElementById("location-map");
    if (!el) return;

    var wrapper = el.closest(".reveal");
    if (!wrapper) {
      createMap();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || mapInitialized) return;
          if (window.runRevealCheck) window.runRevealCheck();
          setTimeout(createMap, 1400);
          observer.disconnect();
        });
      },
      { rootMargin: "50px 0px", threshold: 0.1 },
    );
    observer.observe(wrapper);
  }

  function initForm() {
    var form = document.getElementById("inquiry-form");
    if (!form) return;

    var nameEl = form.querySelector("[name=name]");
    var phoneEl = form.querySelector("[name=phone]");
    var subjectEl = form.querySelector("[name=subject]");
    var errorName = document.getElementById("error-name");
    var errorPhone = document.getElementById("error-phone");
    var errorSubject = document.getElementById("error-subject");

    function formatPhone(value) {
      var digits = value.replace(/\D/g, "").slice(0, 11);
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) return digits.slice(0, 3) + "-" + digits.slice(3);
      return (
        digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7)
      );
    }

    if (phoneEl) {
      phoneEl.addEventListener("input", function () {
        this.value = formatPhone(this.value);
      });
    }

    function clearError(input, messageEl) {
      if (input) {
        input.classList.remove("location-form__input--error");
        input.setAttribute("aria-invalid", "false");
        input.removeAttribute("aria-describedby");
      }
      if (messageEl) messageEl.textContent = "";
    }

    function setError(input, messageEl, text) {
      if (input) {
        input.classList.add("location-form__input--error");
        input.setAttribute("aria-invalid", "true");
        if (messageEl && messageEl.id)
          input.setAttribute("aria-describedby", messageEl.id);
      }
      if (messageEl) messageEl.textContent = text;
    }

    [nameEl, phoneEl, subjectEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", function () {
        clearError(el, form.querySelector("#error-" + el.name));
      });
      el.addEventListener("focus", function () {
        clearError(el, form.querySelector("#error-" + el.name));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameEl ? nameEl.value.trim() : "";
      var phone = phoneEl ? phoneEl.value.trim() : "";
      var subject = subjectEl ? subjectEl.value.trim() : "";
      var valid = true;

      clearError(nameEl, errorName);
      clearError(phoneEl, errorPhone);
      clearError(subjectEl, errorSubject);

      if (!name) {
        setError(nameEl, errorName, "이름을 입력해 주세요.");
        valid = false;
      }
      if (!phone) {
        setError(phoneEl, errorPhone, "전화번호를 입력해 주세요.");
        valid = false;
      }
      if (!subject) {
        setError(subjectEl, errorSubject, "제목을 입력해 주세요.");
        valid = false;
      }
      if (!valid) return;

      alert("문의가 접수되었습니다.");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initMap();
      initForm();
    });
  } else {
    initMap();
    initForm();
  }
})();
