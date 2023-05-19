"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'
import * as domAPI from './domAPI'

domAPI.init();

// console.log(weatherAPI.fetchForecastData('moscow'));