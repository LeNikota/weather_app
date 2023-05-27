"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

domAPI.init();

async function test() {
  const data = await weatherAPI.fetchForecastData('yaroslavl');
  console.log(data);
  domAPI.renderWeatherDOM(data,'°C');
}

test()