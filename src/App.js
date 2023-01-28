import React, { useState } from "react";
import './styles.css';
import '@picocss/pico'
import WeatherCard from "./components/WeatherCard";
import LocationSearch from "./components/LocationSearch";

const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=63.10&longitude=21.62&timezone=Europe/Helsinki&daily=temperature_2m_max,temperature_2m_min'

function App() {
  let [weatherDailyForecast, setWeatherDailyForecast] = useState([]);

  async function getForecast(location) {
    console.log(location)
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);

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

  return (
    <div className="container-fluid">
      <LocationSearch getForecast={getForecast}/>
      <h4 className="forecast-header">7 day weather forecast</h4>
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
