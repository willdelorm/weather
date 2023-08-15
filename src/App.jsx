import { useState } from "react";

const API_KEY = "30ea1430f9530845f4ff44a7d1420907";

// https://openweathermap.org/api/geocoding-api
const getCoordinatesFromCityName = (city) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data[0];
    });
};

// https://openweathermap.org/forecast5
const getForecast = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=4&units=imperial`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

// 2023-08-15 21:00:00
const utcToLocal = (dateStr) => {
  const regex = /[0-9]+/g;
  const utcProps = dateStr.match(regex);
  const localeDateTime = new Date(Date.UTC(...utcProps));

  return localeDateTime;
};

const BG_COLORS = [
  "yellow",
  "orange",
  "red",
  "dark-red",
]

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [cityName, setCityName] = useState("");
  const [forecasts, setForecasts] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchInput !== "") {
      const data = await getCoordinatesFromCityName(searchInput);
      const forecastData = await getForecast(data.lat, data.lon);
      console.log(forecastData);

      setCityName(forecastData.city.name);
      setForecasts(forecastData.list);
    }
  };



  return (
    <div className="app">
      <form className="header" onSubmit={handleSubmit}>
        <i className="fa-solid fa-location-dot" />
        <input type="text" value={searchInput} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <ul className="reports-list">
        {forecasts.map((report, index) => {
          const dateTime = utcToLocal(report.dt_txt).toLocaleTimeString();

          return (
            <li key={index} className={`${BG_COLORS[index]}`}>
              <div className="conditions-image"></div>
              <div className="weather-report">
                <h2>{dateTime}</h2>
                <p className="temp">{report.main.temp_max}</p>
                <p className="condition"> {report.weather[0].main}</p>
                <p className="details">
                  Wind: {report.wind.speed}
                  <br />
                  Humidity: {report.main.humidity}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
