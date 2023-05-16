"use strict"
import './style.css'
import '@picocss/pico'
import * as weatherAPI from './weatherAPI'


console.log(weatherAPI.fetchForecastData('moscow'));