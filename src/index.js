"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

const searchWeatherInput = document.querySelector('.weather-search-input');
searchWeatherInput.addEventListener('keydown', onWeatherSearch);

async function onWeatherSearch(event) {
  if (event.keyCode !== 13) return;

  const data = await weatherAPI.fetchForecastData(event.target.value);
  console.log(data);
  domAPI.renderWeatherDOM(data,'°C');
  event.target.value = '';
}

domAPI.init();