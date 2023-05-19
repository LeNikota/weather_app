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
    if (isMobileDevice()) {
      startX = event.touches[0].clientX;
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    } else {
      startX = event.clientX;
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
    }
  }


  function handleMove(event) {
    const clientX = isMobileDevice() ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;
    futureCarouselPosition = currentCarouselPosition + deltaX;

    const maxPosition = carouselContainer.clientWidth - carousel.clientWidth - 2;
    if (futureCarouselPosition > 0) {
      futureCarouselPosition = 0;
    } else if (futureCarouselPosition < maxPosition) {
      futureCarouselPosition = maxPosition;
    }

    carousel.style.transform = `translateX(${futureCarouselPosition}px)`;
  }

  function handleEnd() {
    currentCarouselPosition = futureCarouselPosition
    if (isMobileDevice()) {
      document.removeEventListener("touchmove", handleMove);
    } else {
      document.removeEventListener("mousemove", handleMove);
    }
  }

  carouselContainer.addEventListener("mousedown", handleStart);
  carouselContainer.addEventListener("touchstart", handleStart);
}

function init() {
  hourlyForecastSliderControls();
}

export { init };
