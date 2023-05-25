"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

domAPI.init();

(async () => console.log(await weatherAPI.fetchForecastData('yaroslavl')))();


async function test() {
  domAPI.displayCurrentWeather(await weatherAPI.fetchForecastData('yaroslavl'),'°C');
}
test()