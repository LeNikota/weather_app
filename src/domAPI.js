import * as utility from './utility';

function hourlyForecastSliderControls() {
  const carouselContainer = document.querySelector(".hourly-forecast");
  const carousel = carouselContainer.querySelector(".hourly-forecast-carousel");

  const isMobile = utility.isMobileDevice();
  let startX = null;
  let currentCarouselPosition = 0;
  let futureCarouselPosition = 0;

  function handleStart(event) {
    if (carouselContainer.clientWidth > carousel.clientWidth) {
      return; // No need to continue if the carousel container is bigger than the carousel
    }
    startX = isMobile ? event.touches[0].clientX : event.clientX;
    document.addEventListener(isMobile ? "touchmove" : "mousemove", handleMove);
    document.addEventListener(isMobile ? "touchend" : "mouseup", handleEnd);
  }

  function handleMove(event) {
    const clientX = isMobile ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;
    futureCarouselPosition = currentCarouselPosition + deltaX;

    const maxPosition = carouselContainer.clientWidth - carousel.clientWidth - 2;
    futureCarouselPosition = Math.max(Math.min(futureCarouselPosition, 0), maxPosition);

    carousel.style.transform = `translateX(${futureCarouselPosition}px)`;
  }

  function handleEnd() {
    currentCarouselPosition = futureCarouselPosition;
    document.removeEventListener(isMobile ? "touchmove" : "mousemove", handleMove);
    document.removeEventListener(isMobile ? "touchend" : "mouseup", handleEnd);
  }

  carouselContainer.addEventListener(isMobile ? "touchstart" : "mousedown", handleStart);
}

function displayCurrentWeather(data, units) {
  const city = document.querySelector('.current-weather-info__city')
  const temperature = document.querySelector('.current-weather-info-temperature')
  const condition = document.querySelector('.current-weather-info__condition')
  const high = document.querySelector('.current-weather-info-temperature-range__high')
  const low = document.querySelector('.current-weather-info-temperature-range__low')
  const img = document.querySelector('.current-weather-info__img')

  city.textContent = data.location.name;
  temperature.textContent = `${data.current.temp_c} ${units}`;
  condition.textContent = data.current.condition.text;
  high.textContent = `H: ${data.forecast.forecastday[0].day.maxtemp_c}°`;
  low.textContent = `L: ${data.forecast.forecastday[0].day.mintemp_c}°`;
  img.src = utility.resolveIconPath(data.current.condition.icon);
}

function init() {
  hourlyForecastSliderControls();
}

export { init, displayCurrentWeather };