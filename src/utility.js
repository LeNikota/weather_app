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
  const timeOfTheDay = path.includes("night") ? "night" : "day";
  const weatherID = parseInt(path.match(/\d+(?=\.png$)/)[0]);

  if ([200, 386, 389].includes(weatherID)) {
    return thunderstorm;
  }

  if ([179, 182, 227, 230, 386, 392, 395].includes(weatherID) || (361 < weatherID && weatherID < 378) || (316 < weatherID && weatherID < 351)) {
    return snow;
  }

  if ([143, 185, 248, 260, 281, 284, 314].includes(weatherID)) {
    return mist;
  }

  if (weatherID === 119) return broken_clouds;
  
  if (weatherID === 122) return cloudy;

  if ([263, 266, 296, 302, 308].includes(weatherID)) {
    return shower_rain;
  }

  if (timeOfTheDay === "day") {
    if (weatherID === 113) return clear_sky_day;
    if (weatherID === 116) return few_clouds_day;
    return rain_day;
  }

  if (weatherID === 113) return clear_sky_night;
  if (weatherID === 116) return few_clouds_night;
  return rain_night;
}



export {
  isMobileDevice,
  resolveIconPath
}