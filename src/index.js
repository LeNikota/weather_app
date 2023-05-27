"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

let metric = '°C';
let fetchedWeatherData = null;
const searchWeatherInput = document.querySelector('.weather-search-input');
const celsiusBtn = document.querySelector('.celsius-button');
const fahrenheitBtn = document.querySelector('.fahrenheit-button');

searchWeatherInput.addEventListener('keydown', onWeatherSearch);
celsiusBtn.addEventListener('click', changeMetric);
fahrenheitBtn.addEventListener('click', changeMetric);

async function onWeatherSearch(event) {
  if (event.keyCode !== 13) return;

  fetchedWeatherData = await weatherAPI.fetchForecastData(event.target.value);
  domAPI.renderWeatherDOM(fetchedWeatherData, metric);
  event.target.value = '';
}

function changeMetric(event) {
  if(!event.target.classList.contains('outline')) return;

  metric = (celsiusBtn.classList.contains('outline')) ? '°C' : '°F';
  domAPI.renderWeatherDOM(fetchedWeatherData, metric);
  
  celsiusBtn.classList.toggle('outline')
  fahrenheitBtn.classList.toggle('outline')
}

domAPI.init();