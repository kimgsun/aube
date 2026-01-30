(function () {
  "use strict";
  if (typeof window.initFilter !== "function") return;
  window.initFilter({
    btnSelector: ".event-filter__btn",
    itemSelector: ".event__item",
    delay: 500,
    batch: true,
    applyFilterName: "applyEventFilter",
    reinitName: "reinitEventFilter",
  });
})();
