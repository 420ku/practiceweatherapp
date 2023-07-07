import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=af39f6b39d8745edbcc15709230607&q=${city}`
          );
          response.ok ? setWeather(await response.json()) : console.error('Error fetching weather data:', response.statusText);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        weather && (
          <div>
            <h2>{weather.location.name}</h2>
            <p>Current Weather: {weather.current.condition.text}</p>
            <p>Current Temperature: {weather.current.temp_c}°C</p>
            <p>Current Humidity: {weather.current.humidity}%</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherApp;