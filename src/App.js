import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast-weather/forecast-weather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(", ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch]).then(
      async (responses) => {
        const currentWeatherResponse = await responses[0].json();
        const forecastWeatherResponse = await responses[1].json();
        
        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecastWeather({
          city: searchData.label,
          ...forecastWeatherResponse,
        });
      }
    );
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <h2>Search for a city to get the weather:</h2>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
