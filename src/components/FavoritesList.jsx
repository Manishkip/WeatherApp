// src/components/FavoritesList.jsx
import React from 'react';
import '../styles/style.css';

const FavoritesList = ({ favorites, fetchWeather, fetchFavorites }) => {
  const removeFavorite = async (id) => {
    await fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE',
    });
    fetchFavorites();
  };

  return (
    <div className="favorites-container">
      <h3 className="favorites-heading">Favorites</h3>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite cities yet!</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((city) => (
            <li key={city.id} className="favorite-item">
              <span
                className="favorite-city"
                onClick={() => fetchWeather(city.name)}
              >
                {city.name}
              </span>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(city.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
