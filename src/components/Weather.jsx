import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const apiKey = "98740bf6902382eb9d43ff1a1fcf55e2";

  const fetchWeather = async () => {
    if (!city) {
      setError("Enter a city name");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const result = await res.json();

      if (result.cod === "404") {
        setError("City not found");
        setData(null);
      } else {
        setData(result);
        setError("");
      }
    } catch {
      setError("Error fetching weather");
    }
  };

  return (
    <div className="weather-card">
      <h1 className="title">Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-info">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h2>{data.name}</h2>
          <h3>{Math.round(data.main.temp)}°C</h3>
          <p>{data.weather[0].description}</p>

          <div className="details">
            <span>💧 {data.main.humidity}%</span>
            <span>💨 {data.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
