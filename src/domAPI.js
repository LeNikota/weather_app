import isMobileDevice from './utility';

function hourlyForecastSliderControls() {
  const carouselContainer = document.querySelector(".hourly-forecast");
  const carousel = carouselContainer.querySelector(".hourly-forecast-carousel");

  let startX = null;
  let currentCarouselPosition = 0;
  let futureCarouselPosition = 0;

  function handleStart(event) {
    if (carouselContainer.clientWidth > carousel.clientWidth) {
      return; // No need to continue if the carousel container is bigger than the carousel
    }
    startX = isMobileDevice() ? event.touches[0].clientX : event.clientX;
    document.addEventListener(isMobileDevice() ? "touchmove" : "mousemove", handleMove);
    document.addEventListener(isMobileDevice() ? "touchend" : "mouseup", handleEnd);
  }

  function handleMove(event) {
    const clientX = isMobileDevice() ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;
    futureCarouselPosition = currentCarouselPosition + deltaX;

    const maxPosition = carouselContainer.clientWidth - carousel.clientWidth - 2;
    futureCarouselPosition = Math.max(Math.min(futureCarouselPosition, 0), maxPosition);

    carousel.style.transform = `translateX(${futureCarouselPosition}px)`;
  }

  function handleEnd() {
    currentCarouselPosition = futureCarouselPosition;
    document.removeEventListener(isMobileDevice() ? "touchmove" : "mousemove", handleMove);
    document.removeEventListener(isMobileDevice() ? "touchend" : "mouseup", handleEnd);
  }

  carouselContainer.addEventListener(isMobileDevice() ? "touchstart" : "mousedown", handleStart);
}

function init() {
  hourlyForecastSliderControls();
}

export { init };