// // src/components/WeatherDisplay.jsx
// import React from 'react';
// import '../styles/style.css';

// const WeatherDisplay = ({ weather, forecast, unit }) => {
//   const convertTemp = (temp) => (unit === 'F' ? (temp * 9) / 5 + 32 : temp);

//   if (!weather) return <p>Enter a city to see weather.</p>;

//   return (
//     <div className='weather_display'>
//       <h2>Current Weather in {weather.name}</h2>
//       <p>
//         {convertTemp(weather.main.temp).toFixed(1)}°{unit}
//       </p>
//       <p>{weather.weather[0].description}</p>

//       <h3>5-Day Forecast</h3>
//       <ul>
//         {forecast.map((day, index) => (
//           <li key={index}>
//             {new Date(day.dt_txt).toLocaleDateString()}: {convertTemp(day.main.temp).toFixed(1)}°{unit} - {day.weather[0].description}
//           </li>
//         ))}
//       </ul>

//       <button>Add To Favorites</button>
//     </div>
//   );
// };

// export default WeatherDisplay;

import React from 'react';
import '../styles/style.css';

const WeatherDisplay = ({ weather, forecast, unit, addFavorite, favorites }) => {
  // Convert temperature based on unit (Fahrenheit or Celsius)
  const convertTemp = (temp) => (unit === 'F' ? (temp * 9) / 5 + 32 : temp);

  if (!weather) return <p>Enter a city to see weather.</p>;

  // Handle the addition of the current city to favorites
  const handleAddToFavorites = () => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.name.toLowerCase() === weather.name.toLowerCase()
    );
    if (!isAlreadyFavorite) {
      addFavorite(weather.name);
    } else {
      alert(`${weather.name} is already in your favorites.`);
    }
  };

  return (
    <div className='weather_display'>
      <h2>Current Weather in {weather.name}</h2>
      <p>
        {convertTemp(weather.main.temp).toFixed(1)}°{unit}
      </p>
      <p>{weather.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index}>
            {new Date(day.dt_txt).toLocaleDateString()}: {convertTemp(day.main.temp).toFixed(1)}°{unit} -{' '}
            {day.weather[0].description}
          </li>
        ))}
      </ul>

      <button onClick={handleAddToFavorites}>Add To Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
