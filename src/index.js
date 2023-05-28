"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

let metric = '°C';
let weatherData = null;
const controller = new AbortController()
const signal = controller.signal;

const searchWeatherInput = document.querySelector('.weather-search-input');
const celsiusBtn = document.querySelector('.celsius-button');
const fahrenheitBtn = document.querySelector('.fahrenheit-button');

document.addEventListener('DOMContentLoaded', onDOMLoaded)
searchWeatherInput.addEventListener('keydown', onWeatherSearch);
celsiusBtn.addEventListener('click', onChangeMetric);
fahrenheitBtn.addEventListener('click', onChangeMetric);

async function onDOMLoaded() {
  const ip = await weatherAPI.fetchIPAddress(signal);
  weatherData = await weatherAPI.fetchForecastData(ip.data, signal);

  if (signal.aborted) return;
  if (!weatherData.success) {
    domAPI.displayError(weatherData.error);
    return;
  }

  domAPI.renderWeatherDOM(weatherData.data, metric);
}

async function onWeatherSearch(event) {
  if (event.keyCode !== 13) return;
  if (!signal.aborted) controller.abort(); // When data is requested first time by ip in the onDOMLoaded and it hadn't reached site before a user entered the city , abort fetching to avoid rerendering data requested by ip
  domAPI.displayLoading();
  weatherData = await weatherAPI.fetchForecastData(event.target.value);

  if (!weatherData.success) {
    domAPI.displayError(weatherData.error);
    return;
  }

  domAPI.renderWeatherDOM(weatherData.data, metric);
}

function onChangeMetric(event) {
  if(!event.target.classList.contains('outline')) return;
  metric = (celsiusBtn.classList.contains('outline')) ? '°C' : '°F';
  
  celsiusBtn.classList.toggle('outline')
  fahrenheitBtn.classList.toggle('outline')

  if(!weatherData.success) return;
  domAPI.renderWeatherDOM(weatherData.data, metric);
}

domAPI.init();