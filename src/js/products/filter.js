(function () {
  "use strict";
  if (typeof window.initFilter !== "function") return;
  window.initFilter({
    btnSelector: ".product-filter__nav .product-filter__btn",
    itemSelector: ".product__item",
    delay: 600,
    batch: false,
    applyFilterName: "applyProductFilter",
    reinitName: "reinitProductFilter",
  });
})();
