import clear_sky_day from './img/clear_sky_day.png'
import clear_sky_night from './img/clear_sky_night.png'
import few_clouds_day from './img/few_clouds_day.png'
import few_clouds_night from './img/few_clouds_night.png'
import rain_day from './img/rain_day.png'
import rain_night from './img/rain_night.png'
import shower_rain from './img/shower_rain.png'
import broken_clouds from './img/broken_clouds.png'
import cloudy from './img/cloudy.png'
import thunderstorm from './img/thunderstorm.png'
import snow from './img/snow.png'
import mist from './img/mist.png'

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("Mobile") !== -1 ||
    navigator.userAgent.indexOf("Android") !== -1 ||
    navigator.userAgent.indexOf("iOS") !== -1 ||
    navigator.userAgent.indexOf("Windows Phone") !== -1
  );
}

function resolveIconPath(path) {
  const timeOfTheDay = path.match(/night|day/)[0]
  const weatherID = path.match(/\d+.png$/)[0]
  if(385 < weatherID || weatherID == 200){
    return thunderstorm;
  }
  if (
    (361 < weatherID  && weatherID < 378) ||
    (316 < weatherID && weatherID < 351) ||
    (226 < weatherID && weatherID < 231) ||
    (178 < weatherID && weatherID < 183)
  ) {
    return snow;
  }
  if(247 < weatherID && weatherID < 261 || weatherID == 143){
    return mist;
  }
  if(weatherID == 122){
    return cloudy;
  }
  if(weatherID == 119){
    return broken_clouds;
  }
  if(weatherID == 263 || weatherID == 266 || weatherID == 296 || weatherID == 302 || weatherID == 308){
    return shower_rain;
  }
  if(timeOfTheDay === 'day'){
    if (weatherID == 113) {
      return clear_sky_day;
    }
    if(weatherID == 116) {
      return few_clouds_day;
    } else {
      return rain_day
    }
  } else { 
    if (weatherID == 113) {
      return clear_sky_day;
    }
    if(weatherID == 116) {
      return few_clouds_day;
    } else {
      return rain_day
    }
  }
}

export {
  isMobileDevice,
  resolveIconPath
}