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

function displayCurrentWeatherHourlyForecast(data, units) {
  const container = document.querySelector('.hourly-forecast-carousel');

  data.forecast.forecastday[0].hour.forEach(hour => {
    const card = document.createElement('article');
    card.classList.add('hourly-forecast-card');

    const header = document.createElement('header');
    const hgroup = document.createElement('hgroup');

    const time = document.createElement('h3');
    time.textContent = hour.time.match(/\d+:\d+/)[0];
    hgroup.appendChild(time);

    const condition = document.createElement('h4');
    condition.textContent = hour.condition.text;
    hgroup.appendChild(condition);

    header.appendChild(hgroup);
    card.appendChild(header);

    const image = document.createElement('img');
    image.src = utility.resolveIconPath(hour.condition.icon);
    card.appendChild(image);

    const temperature = document.createElement('h3');
    temperature.textContent = `${hour.temp_c}${units}`;
    card.appendChild(temperature);

    container.appendChild(card);
  });
}

function displayCurrentWeatherDetails(data, units) {
  const sunrise = document.querySelector('.current-weather-details__sunrise');
  const sunset = document.querySelector('.current-weather-details__sunset');
  const chanceOfRain = document.querySelector('.current-weather-details__chance-of-rain');
  const humidity = document.querySelector('.current-weather-details__humidity');
  const wind = document.querySelector('.current-weather-details__wind');
  const feelsLike = document.querySelector('.current-weather-details__feels-like');
  const precipitation = document.querySelector('.current-weather-details__precipitation');
  const pressure = document.querySelector('.current-weather-details__pressure');
  const visibility = document.querySelector('.current-weather-details__visibility');
  const uvIndex = document.querySelector('.current-weather-details__uv-index');

  sunrise.textContent = utility.convert12to24(data.forecast.forecastday[0].astro.sunrise);
  sunset.textContent = utility.convert12to24(data.forecast.forecastday[0].astro.sunset);
  chanceOfRain.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_dir} ${data.current.wind_kph} km/h`;
  feelsLike.textContent = `${data.current.feelslike_c} ${units}`;
  precipitation.textContent = `${data.forecast.forecastday[0].day.totalprecip_mm} mm`;
  pressure.textContent = `${data.current.pressure_mb} mb`;
  visibility.textContent = `${data.current.vis_km} km`;
  uvIndex.textContent = `${data.current.uv}`;
}

function displayWeatherForecast(data, units) {
  const container = document.querySelector('.weather-forecast');

  data.forecast.forecastday.forEach((day) => {
    const forecastInfo = document.createElement('div');
    forecastInfo.className = 'weather-forecast-info grid';

    const dayOfTheWeek = document.createElement('div');
    dayOfTheWeek.textContent = new Date(day.date).toLocaleDateString('eu-EU',{weekday: 'long'});

    const icon = document.createElement('img');
    icon.src = utility.resolveIconPath(day.day.condition.icon);

    const collapse1 = document.createElement('div');
    collapse1.className = 'collapse';
    collapse1.textContent = `${day.day.daily_chance_of_rain}%`;

    const collapse2 = document.createElement('div');
    collapse2.className = 'collapse';
    collapse2.textContent = `${day.day.avghumidity}%`;

    const temperature = document.createElement('div');
    temperature.textContent = `${day.day.mintemp_c}°/${day.day.maxtemp_c}°`;

    forecastInfo.appendChild(dayOfTheWeek);
    forecastInfo.appendChild(icon);
    forecastInfo.appendChild(collapse1);
    forecastInfo.appendChild(collapse2);
    forecastInfo.appendChild(temperature);

    container.appendChild(forecastInfo);
  });
}

function renderWeatherDOM(data, units) {
  displayCurrentWeather(data, units);
  displayCurrentWeatherHourlyForecast(data, units);
  displayCurrentWeatherDetails(data, units);
  displayWeatherForecast(data, units);
}

function init() {
  hourlyForecastSliderControls();
}

export { init, renderWeatherDOM };