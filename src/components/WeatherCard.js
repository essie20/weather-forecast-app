import React from "react";

function WeatherCard({ forecastValue }) {
  if (!forecastValue) return;
  let day = new Date(forecastValue.time);
  let weekDay = new Intl.DateTimeFormat('en-US', { weekday: "long", day: "numeric" }).format(day);
  return (
    <article className="weather-card">
      <div>{weekDay}</div>
      {forecastValue.max} {forecastValue.unit} / {forecastValue.min} {forecastValue.unit}
    </article>
  )
}

export default WeatherCard;