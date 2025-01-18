// src/components/FavoritesList.jsx
import React from 'react';

const FavoritesList = ({ favorites, fetchWeather, fetchFavorites }) => {
  const removeFavorite = async (id) => {
    await fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE',
    });
    fetchFavorites();
  };

  return (
    <div className='weather_display'>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city.id}>
            <span onClick={() => fetchWeather(city.name)}>{city.name}</span>
            <button onClick={() => removeFavorite(city.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
