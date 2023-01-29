import React, { useState } from "react";
import './styles.css';
import '@picocss/pico'
import WeatherCard from "./components/WeatherCard";
import LocationSearch from "./components/LocationSearch";

function App() {
  let [weatherDailyForecast, setWeatherDailyForecast] = useState([]);
  let [currentWeather, setCurrentWeather] = useState();

  async function getForecast(location) {
    console.log(location)
    let latitude = parseFloat(location.lat);
    let longitude = parseFloat(location.lon);
    let params = `latitude=${latitude}&longitude=${longitude}`
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}&timezone=Europe/Helsinki&daily=temperature_2m_max,temperature_2m_min&current_weather=true`);
    let data = await response.json();

    data.current_weather.unit = '°C'
    setCurrentWeather(data.current_weather)

    let dailyValues = [];
    for (let i = 0; i < data.daily.time.length; i++) {
      dailyValues.push({
        max: Math.round(data.daily.temperature_2m_max[i]),
        min: Math.round(data.daily.temperature_2m_min[i]),
        unit: data.daily_units.temperature_2m_max,
        time: data.daily.time[i]
      })
    }

    setWeatherDailyForecast(dailyValues);
  }
  
  let displayCurrentWeather;
  if (currentWeather) {
    displayCurrentWeather = (
      <div className="current-weather">
        Current temperature: {currentWeather.temperature} {currentWeather.unit}
      </div>
    )
  }
   
  return (
    <div className="container-fluid">
      <LocationSearch getForecast={getForecast}/>
      <h3 className="forecast-header">7 day weather forecast</h3>
      {displayCurrentWeather}
      <div className="grid">
        {
          weatherDailyForecast.map((forecastValue, i) => {
            return (<WeatherCard
              key={i}
              forecastValue={forecastValue}
              />)
            })
        }
      </div>
      
    </div>
  );
}

export default App;
