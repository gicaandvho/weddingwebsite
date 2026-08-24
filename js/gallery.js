(() => {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const items = [...document.querySelectorAll("[data-lightbox-src]")];
  if (!lightbox || !lightboxImage || !items.length) return;

  const panel = lightbox.querySelector(".lightbox__panel");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const previousButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let currentIndex = 0;
  let lastFocusedElement = null;

  const showItem = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    panel.classList.remove("is-placeholder");
    lightboxImage.src = item.dataset.lightboxSrc;
    lightboxImage.alt = item.dataset.lightboxAlt || "";
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove("u-overflow-hidden");
    lightboxImage.removeAttribute("src");
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  const open = (index) => {
    lastFocusedElement = document.activeElement;
    showItem(index);
    lightbox.hidden = false;
    document.body.classList.add("u-overflow-hidden");
    closeButton.focus();
  };

  items.forEach((item, index) => item.addEventListener("click", () => open(index)));
  closeButton.addEventListener("click", close);
  previousButton.addEventListener("click", () => showItem(currentIndex - 1));
  nextButton.addEventListener("click", () => showItem(currentIndex + 1));

  lightboxImage.addEventListener("error", () => {
    lightboxImage.removeAttribute("src");
    panel.classList.add("is-placeholder");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") showItem(currentIndex - 1);
    if (event.key === "ArrowRight") showItem(currentIndex + 1);
    if (event.key === "Tab") {
      const focusable = [closeButton, previousButton, nextButton];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();