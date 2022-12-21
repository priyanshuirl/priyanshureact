import "./app.css";
import { useState } from "react";

export default function App() {
  const appId = "546b8e7bc2e42c8c92a2572386d39b0a";
  const units = "metric";
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async (city) => {
    var endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=${units}`;
    try {
      setLoading(true);
      const res = await fetch(endpoint);
      const data = await res.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error Fetching:", err);
      setWeatherData(null);
    }
  };

  const handleChange = (e) => setInputCity(e.target.value);

  const handleEnter = (e) => {
    if (e?.key === "Enter") {
      handleFetchWeather(inputCity);
    }
  };

  return (
    <div className="App">
      <h1 class="heading">Weather in</h1>
      <p>By Priyanshu Mishra</p>
      <input
        onChange={handleChange}
        onKeyDown={handleEnter}
        class="city_input"
      />
      {weatherData ? (
        <>
          {loading ? (
            <p class="loading">Loading...</p>
          ) : (
            <div class="card">
              <div>
                <h3 class="city_title">{weatherData?.name}</h3>
                <p class="dots">...</p>
                <div class="wrapper">
                  <p class="thin_large">
                    {weatherData?.main?.temp?.toPrecision(2)}°C
                  </p>
                  <div class="minmax_wrapper">
                    <p class="desc">{weatherData?.weather[0].description}</p>
                    <p>Max: {weatherData?.main?.temp_max?.toPrecision(2)}°C</p>
                    <p>Min: {weatherData?.main?.temp_min?.toPrecision(2)}°C</p>
                  </div>
                </div>
              </div>
              <div class="icon_container">
                <img
                  class="icon"
                  src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
                  alt="icon"
                />
              </div>
              <div class="wrapper">
                <div>
                  <p class="thin_small">
                    {weatherData?.main?.feels_like.toPrecision(2)}°C
                  </p>
                  <p>Feels Like</p>
                </div>
                <div>
                  <p class="thin_small">{weatherData?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <br />
          <br />
          <p class="landing_message">Enter a City name and press enter</p>
        </>
      )}
    </div>
  );
}
