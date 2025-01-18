import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import FavoritesList from './FavoritesList';
import CitySearch from './CitySearch';
import axios from 'axios';

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('C'); // Celsius by default

  const apiKey = 'ed90be8ab7311f9a19c8cbe51dfbc03d';

  // Fetch weather data and favorites list on initial load
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) fetchWeather(lastCity);
    fetchFavorites();
  }, []);

  // Fetch weather data for the specified city
  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found or API error');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather(weatherData);
      setForecast(forecastData.list.slice(0, 5));
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('There was an error fetching the weather data. Please try again.');
    }
  };

  // Fetch the list of favorite cities from the JSON server
  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3001/favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  // Add a city to the favorites list
  const addFavorite = async (cityName) => {
    try {
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.name.toLowerCase() === cityName.toLowerCase()
      );
      if (!isAlreadyFavorite) {
        const response = await axios.post('http://localhost:3001/favorites', { name: cityName });
        setFavorites([...favorites, response.data]); // Update favorites state
      } else {
        alert(`${cityName} is already in your favorites.`);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <button onClick={toggleUnit}>
        Switch to °{unit === 'C' ? 'F' : 'C'}
      </button>
      <CitySearch onSearch={fetchWeather} />
      <WeatherDisplay
        weather={currentWeather}
        forecast={forecast}
        unit={unit}
        addFavorite={addFavorite}
        favorites={favorites} // Pass the favorites list to WeatherDisplay
      />
      <FavoritesList favorites={favorites} fetchWeather={fetchWeather} fetchFavorites={fetchFavorites} />
    </div>
  );
};

export default WeatherDashboard;
