async function fetchForecastData(city, signal) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=35cd943d20aa4b9c9f1202434230605&days=14&q=${city}`, { signal });
    
    if(!response.ok) {
      throw new Error('Failed to fetch weather data: ' + + response.status)
    }
    
    const forecastData = await response.json();
    return forecastData;
  } catch (error) {
    console.error(error);
  }
}

async function fetchIPAddress(signal) {
  try {
    const response = await fetch(`https://api.ipify.org?format=json`, { signal });
    
    if(!response.ok) {
      throw new Error('Failed to fetch ip data: ' + response.status)
    }
    
    const ipAddress = await response.json();
    return ipAddress.ip;
  } catch (error) {
    console.error(error);
  }
}

export {
  fetchForecastData,
  fetchIPAddress
}