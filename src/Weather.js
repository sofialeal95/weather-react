import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

  function loadData(response) {
    setWeather({
      cityName: response.data.name,
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon:
        `https://openweathermap.org/img/wn/` +
        response.data.weather[0].icon +
        `@2x.png`,
    });
  }

  function handleSumbit(event) {
    event.preventDefault();
    let apiKey = `3bc520cc14bbdedfd7e45158f2ef0439`;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(loadData);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSumbit}>
      <input
        type="search"
        placeholder="Seach for a city..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (weather) {
    return (
      <div>
        {form}
        <h1>{weather.cityName.toUpperCase()}</h1>
        <ul className="search-results">
          <li>
            <strong>Temperature:</strong> {Math.round(weather.temp)}°C
          </li>
          <li>
            <strong>Description:</strong> {weather.description}
          </li>
          <li>
            <strong>Humidity:</strong> {weather.humidity}%
          </li>
          <li>
            <strong>Wind:</strong> {weather.wind}km/h
          </li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
