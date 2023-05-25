async function fetchForecastData(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=35cd943d20aa4b9c9f1202434230605&q=${city}`);
    
    if(!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const forecastData = await response.json();
    return forecastData;
  } catch (error) {
    console.error(error);
  }
}

export {
  fetchForecastData
}