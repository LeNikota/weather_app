async function fetchForecastData(city, signal) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=35cd943d20aa4b9c9f1202434230605&days=14&q=${city}`, { signal });

    if(!response.ok) {
      const {error: { message }} = await response.json();
      return { success: false, error: message};
    }

    const forecastData = await response.json();
    return { success: true, data: forecastData };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred during the request: ' + error }
  }
}

async function fetchIPAddress(signal) {
  try {
    const response = await fetch(`https://api.ipify.org?format=json`, { signal });
    
    if(!response.ok) {
      return { success: false, error: 'Failed to fetch ip, status: ' + response.status };
    }
    
    const ipAddress = await response.json();
    return { success: true, data: ipAddress.ip };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred during the request: ' + error }
  }
}

export {
  fetchForecastData,
  fetchIPAddress
}