"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

let metric = '°C';
let fetchedWeatherData = null;
const controller = new AbortController()
const signal = controller.signal;

const searchWeatherInput = document.querySelector('.weather-search-input');
const celsiusBtn = document.querySelector('.celsius-button');
const fahrenheitBtn = document.querySelector('.fahrenheit-button');

document.addEventListener('DOMContentLoaded', onDOMLoaded)
searchWeatherInput.addEventListener('keydown', onWeatherSearch);
celsiusBtn.addEventListener('click', changeMetric);
fahrenheitBtn.addEventListener('click', changeMetric);

async function onDOMLoaded() {
  try {
    const ip = await weatherAPI.fetchIPAddress(signal);
    fetchedWeatherData = await weatherAPI.fetchForecastData(ip, signal);
    
    if(signal.aborted) return;
    domAPI.renderWeatherDOM(fetchedWeatherData, metric);
  } catch (error){
    console.error(error);
  }
}

async function onWeatherSearch(event) {
  if (event.keyCode !== 13) return;
  if (!signal.aborted) controller.abort(); // When data is requested first time by ip in the onDOMLoaded and it hadn't reached site before a user entered the city , abort fetching to avoid rerendering data requested by ip

  try {
    fetchedWeatherData = await weatherAPI.fetchForecastData(event.target.value);
    domAPI.renderWeatherDOM(fetchedWeatherData, metric);
  } catch (error) {
    console.error(error);
  }
}

function changeMetric(event) {
  if(!event.target.classList.contains('outline')) return;

  metric = (celsiusBtn.classList.contains('outline')) ? '°C' : '°F';
  domAPI.renderWeatherDOM(fetchedWeatherData, metric);
  
  celsiusBtn.classList.toggle('outline')
  fahrenheitBtn.classList.toggle('outline')
}

domAPI.init();

searchWeatherInput.value = 'yaroslavl'
searchWeatherInput.dispatchEvent(new KeyboardEvent('keydown', {
  key: 'Enter',
  keyCode: 13,
  which: 13,
  bubbles: true
}))