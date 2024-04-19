import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./weather.css";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "66dc8817c3439e5c408f731143c36a35"; // Use your actual API key
  const lat = "17.639762355942285"; // Latitude for Chicago
  const lon = "78.3789324345932"; // Longitude for Chicago
  const exclude = "minutely,hourly"; // Customize as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=metric&lang=en`;
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  // Ensure weatherData is not null before attempting to access its properties
  if (!weatherData) {
    return null;
  }

  const { current } = weatherData;
  console.log(current);

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div>Premier Site</div>
        <div
          style={{
            background: "#ffffff",
            color: "#313131",
            borderRadius: "8px",
            margin: "10px",
            padding: "10px",
            fontSize: "12px",
          }}
        >
          Maheshwaram Mandal, Raviryala Village, Ranga Reddy District, 501359,
          Telangana, India.
        </div>
        <div className="weather-header-day">
          {" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="weather-main">
        <div className="weather-temp">{current.temp.toFixed(1)}&deg;C</div>
        <div className="weather-feels-like">
          {current.feels_like.toFixed(1)}&deg;C
        </div>
        <div className="weather-feels-like">
          {current.weather[0].description}
        </div>
      </div>
      <div className="weather-details">
        <div>Wind: {current.wind_speed.toFixed(2)} Km/h</div>
        <div>Humidity: {current.humidity} %</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
