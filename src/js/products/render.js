(function () {
  "use strict";

  function formatPrice(price) {
    const n = typeof price === "number" && !Number.isNaN(price) ? price : 0;
    return "₩ " + n.toLocaleString();
  }

  async function fetchProducts() {
    const res = await fetch("src/data/products.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid data");
    return data;
  }

  function safe(v) {
    return v != null ? v : "";
  }

  function renderProductItem(p, container) {
    if (!p || !container) return;
    const layout = p.layout || "main";
    const href = "product-detail.html?id=" + safe(p.id);
    const name = safe(p.name);
    const label = safe(p.label);
    const desc = safe(p.description);
    const img = safe(p.image);
    const cat = safe(p.category);
    const info = `<span class="product__label">${label}</span><h3 class="product__title serif">${name}</h3><p class="product__description">${desc}</p><div class="product__price-wrapper"><span class="product__price serif">${formatPrice(p.price)}</span></div>`;

    let html =
      '<a class="product__item product-row reveal" data-category="' +
      cat +
      '" href="' +
      href +
      '">';
    if (layout === "main" || layout === "wide") {
      html +=
        '<div class="product__image product__image--main"><img src="' +
        img +
        '" alt="' +
        name +
        '" /></div><div class="product__info product__info--main">' +
        info +
        "</div>";
    } else if (layout === "left") {
      html +=
        '<div class="product__info product__info--left">' +
        info +
        '</div><div class="product__image product__image--right"><img src="' +
        img +
        '" alt="' +
        name +
        '" /></div>';
    } else if (layout === "square") {
      html +=
        '<div class="product__image product__image--square"><img src="' +
        img +
        '" alt="' +
        name +
        '" /></div><div class="product__info product__info--right"><div class="visual__deco">AUBE</div>' +
        info +
        "</div>";
    } else if (layout === "small") {
      html +=
        '<div class="product__info product__info--small">' +
        info +
        '</div><div class="product__image product__image--small"><img src="' +
        img +
        '" alt="' +
        name +
        '" /></div>';
    } else {
      html +=
        '<div class="product__image product__image--main"><img src="' +
        img +
        '" alt="' +
        name +
        '" /></div><div class="product__info product__info--main">' +
        info +
        "</div>";
    }
    html += "</a>";
    container.insertAdjacentHTML("beforeend", html);
  }

  function renderMenuItems(products, container) {
    if (!container || !Array.isArray(products)) return;
    products.slice(0, 3).forEach((p, i) => {
      if (!p) return;
      const delay = [1, 3, 5][i] || 1;
      container.insertAdjacentHTML(
        "beforeend",
        '<a href="product-detail.html?id=' +
          safe(p.id) +
          '" class="menu__item reveal reveal-delay-' +
          delay +
          '"><div class="menu__item-image"><img src="' +
          safe(p.image) +
          '" alt="' +
          safe(p.name) +
          '" /></div><h3 class="menu__item-title serif">' +
          safe(p.name) +
          '</h3><p class="menu__item-subtitle">' +
          safe(p.label) +
          "</p></a>",
      );
    });
  }

  function renderProductDetail(p) {
    if (!p) return;
    const name = safe(p.name);
    const q = document.querySelector.bind(document);
    const set = (sel, text) => {
      const el = q(sel);
      if (el) el.textContent = text;
    };
    set(".product-detail__label", safe(p.label));
    set(".product-detail__title", name);
    set(".product-detail__price", formatPrice(p.price));
    set(".product-detail__section-text", safe(p.detailDescription));
    set(".product-detail__ingredients", safe(p.ingredients));
    const mainImg = q(".product-detail__main-image .product__image img");
    if (mainImg) {
      mainImg.src = safe(p.image);
      mainImg.alt = name + " 메인 이미지";
    }
    if (p.thumbnailImages && Array.isArray(p.thumbnailImages)) {
      q(".product-detail__thumbnail .product__image img") &&
        document
          .querySelectorAll(".product-detail__thumbnail .product__image img")
          .forEach((el, i) => {
            if (p.thumbnailImages[i]) {
              el.src = p.thumbnailImages[i];
              el.alt = "제품 디테일 " + (i + 1);
            }
          });
    }
  }

  function renderRelated(products, excludeId, container) {
    if (!container || !Array.isArray(products)) return;
    const rest = products.filter((x) => x && x.id !== excludeId);
    const shuffled = rest.slice().sort(() => Math.random() - 0.5);
    shuffled.slice(0, 3).forEach((p) => {
      if (!p) return;
      container.insertAdjacentHTML(
        "beforeend",
        '<a href="product-detail.html?id=' +
          safe(p.id) +
          '" class="product-related__card reveal"><div class="product-related__card-image"><div class="product__image"><img src="' +
          safe(p.image) +
          '" alt="' +
          safe(p.name) +
          '" /></div></div><div class="product-related__card-content"><h3 class="product-related__card-title serif">' +
          safe(p.name) +
          '</h3><p class="product-related__card-price">' +
          formatPrice(p.price) +
          "</p></div></a>",
      );
    });
  }

  async function init() {
    let products;
    try {
      products = await fetchProducts();
    } catch (e) {
      alert("제품 데이터를 불러올 수 없습니다.");
      return;
    }

    const listEl = document.querySelector(".product-collection .container");
    if (listEl) {
      listEl.innerHTML = "";
      products.forEach((p) => renderProductItem(p, listEl));
    }

    const menuEl = document.querySelector(".menu__grid");
    if (menuEl) {
      menuEl.innerHTML = "";
      renderMenuItems(products, menuEl);
      if (window.runRevealCheck) window.runRevealCheck();
    }

    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      const product = products.find((x) => x.id === id);
      if (product) {
        try {
          renderProductDetail(product);
          const relatedEl = document.querySelector(".product-related__grid");
          if (relatedEl) {
            relatedEl.innerHTML = "";
            renderRelated(products, id, relatedEl);
          }
        } catch (err) {
          alert("제품 정보를 표시할 수 없습니다.");
        }
      } else {
        alert("해당 제품을 찾을 수 없습니다.");
        const rel = document.querySelector(".product-related");
        if (rel) rel.classList.add("is-hidden");
      }
    }

    if (window.reinitProductFilter) setTimeout(window.reinitProductFilter, 200);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
