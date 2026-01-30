(function () {
  "use strict";

  async function fetchEvents() {
    const res = await fetch("src/data/events.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid data");
    return data;
  }

  function safe(v) {
    return v != null ? v : "";
  }

  function badge(status) {
    return status === "ongoing"
      ? "Ongoing"
      : status === "upcoming"
        ? "Upcoming"
        : "Past";
  }

  function renderEventItem(ev, container) {
    if (!ev || !container) return;
    const status = ev.category || "past";
    const layout = ev.layout || "default";
    const href = "event-detail.html?id=" + safe(ev.id);
    const title = String(safe(ev.title)).replace(/\n/g, " <br />");
    const titleAttr = String(safe(ev.title)).replace(/\n/g, " ");
    const img = safe(ev.image);
    const desc = safe(ev.description);
    const period = safe(ev.period);
    const season = safe(ev.season);
    const block =
      '<span class="event__badge event__badge--' +
      status +
      '">' +
      badge(status) +
      '</span><p class="event__category">' +
      season +
      '</p><h2 class="event__title serif">' +
      title +
      '</h2><p class="event__description">' +
      desc +
      '</p><div class="event__meta">' +
      period +
      "</div>";
    const imgBlock =
      '<div class="event__image-wrapper"><div class="event__image"><img src="' +
      img +
      '" alt="' +
      titleAttr +
      ' 이미지" /></div></div>';
    const contentBlock = '<div class="event__content">' + block + "</div>";

    let html =
      '<a class="event__item reveal active" data-category="' +
      status +
      '" href="' +
      href +
      '">';
    if (ev.deco) html += '<div class="visual__deco">' + ev.deco + "</div>";
    if (layout === "left")
      html +=
        '<div class="event__content event__content--left">' +
        block +
        '</div><div class="event__image-wrapper event__image-wrapper--right"><div class="event__image"><img src="' +
        img +
        '" alt="' +
        titleAttr +
        ' 이미지" /></div></div>';
    else if (layout === "square")
      html +=
        '<div class="event__image-wrapper event__image-wrapper--square"><div class="event__image"><img src="' +
        img +
        '" alt="' +
        titleAttr +
        ' 이미지" /></div></div><div class="event__content event__content--right">' +
        block +
        "</div>";
    else if (layout === "wide")
      html +=
        '<div class="event__image-wrapper event__image-wrapper--wide"><div class="event__image"><img src="' +
        img +
        '" alt="' +
        titleAttr +
        ' 이미지" /></div></div><div class="event__content event__content--center">' +
        block +
        "</div>";
    else html += imgBlock + contentBlock;
    html += "</a>";
    container.insertAdjacentHTML("beforeend", html);
  }

  function renderEventDetail(ev) {
    if (!ev) return;
    const title = String(safe(ev.title)).replace(/\n/g, " ");
    const titleBr = String(safe(ev.title)).replace(/\n/g, " <br />");
    const q = document.querySelector.bind(document);
    const qa = document.querySelectorAll.bind(document);
    const set = (sel, text) => {
      const el = q(sel);
      if (el) el.textContent = text;
    };

    set(
      ".event-detail-hero__label",
      ev.detailLabel || ev.season || "Seasonal Event 2026",
    );
    const titleEl = q(".event-detail-hero__title");
    if (titleEl) titleEl.innerHTML = titleBr;
    set(".event-detail-content__title", ev.detailTitle || title);
    set(
      ".event-detail-content__intro",
      safe(ev.detailIntro) || safe(ev.description),
    );
    set(
      ".event-detail-content__text",
      safe(ev.detailText) || safe(ev.description),
    );
    set(".event-detail-info__value", safe(ev.duration) || safe(ev.period));
    const locEl = qa(".event-detail-info__text")[0];
    if (locEl) locEl.textContent = safe(ev.location);

    const heroImg = q(".event-detail-hero__bg img");
    if (heroImg) {
      heroImg.src = (ev.detailImages && ev.detailImages[0]) || ev.image || "";
      heroImg.alt = title + " 메인 이미지";
    }

    const imgWrap = q(".event-detail-content__image-wrapper");
    if (imgWrap && ev.detailImages && ev.detailImages[0])
      imgWrap.innerHTML =
        '<div class="event__image"><img src="' +
        ev.detailImages[0] +
        '" alt="' +
        title +
        ' 이미지" /></div>';

    const gallery = q(".event-detail-gallery");
    if (gallery) {
      if (ev.detailImages && ev.detailImages.length > 1) {
        gallery.innerHTML = "";
        ev.detailImages.slice(1).forEach((src, i) => {
          gallery.insertAdjacentHTML(
            "beforeend",
            '<div class="event__image"><img src="' +
              src +
              '" alt="' +
              title +
              " 갤러리 " +
              (i + 1) +
              '" /></div>',
          );
        });
      } else gallery.classList.add("is-hidden");
    }

    const menuList = q(".event-detail-menu__list");
    const menuSection = q(".event-detail-menu");
    if (menuList) {
      menuList.innerHTML = "";
      if (ev.menu && Array.isArray(ev.menu) && ev.menu.length) {
        ev.menu.forEach((item) => {
          menuList.insertAdjacentHTML(
            "beforeend",
            '<li class="event-detail-menu__item"><span>' +
              safe(item && item.name) +
              '</span><span class="event-detail-menu__price">₩ ' +
              (item && typeof item.price === "number"
                ? item.price
                : 0
              ).toLocaleString() +
              "</span></li>",
          );
        });
      } else if (menuSection) menuSection.classList.add("is-hidden");
    }

    const titleTag = q("title");
    if (titleTag) titleTag.textContent = title + " | AUBE";

    set(".event-detail-cta__label", safe(ev.ctaLabel) || "Share the Moment");
    const ctaTitleEl = q(".event-detail-cta__title");
    if (ctaTitleEl)
      ctaTitleEl.innerHTML = (
        safe(ev.ctaTitle) || "Invitation to\nSpring Dawn."
      ).replace(/\n/g, " <br />");
  }

  async function init() {
    let events;
    try {
      events = await fetchEvents();
    } catch (e) {
      alert("이벤트 데이터를 불러올 수 없습니다.");
      return;
    }

    const listEl = document.querySelector(".event-list .container");
    if (listEl) {
      listEl.innerHTML = "";
      events.forEach((ev) => renderEventItem(ev, listEl));
    }

    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      const event = events.find((e) => e.id === id);
      if (event) {
        try {
          renderEventDetail(event);
        } catch (err) {
          alert("이벤트 정보를 표시할 수 없습니다.");
        }
      } else {
        alert("해당 이벤트를 찾을 수 없습니다.");
        const hero = document.querySelector(".event-detail-hero");
        const content = document.querySelector(".event-detail-content");
        if (hero) hero.classList.add("is-hidden");
        if (content) content.innerHTML = "";
      }
    }

    if (window.reinitEventFilter) setTimeout(window.reinitEventFilter, 200);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
