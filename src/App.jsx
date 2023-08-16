import { useState } from "react";
import Forecast from "./components/Forecast";

const API_KEY = import.meta.env.VITE_API_KEY;

const FORECAST_DATA = {
  dt: 1692144000,
  main: {
    temp: 101.59,
    feels_like: 103.21,
    temp_min: 101.59,
    temp_max: 102.38,
    pressure: 1012,
    sea_level: 1012,
    grnd_level: 998,
    humidity: 27,
    temp_kf: -0.44,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  clouds: {
    all: 75,
  },
  wind: {
    speed: 10.42,
    deg: 278,
    gust: 7.72,
  },
  visibility: 10000,
  pop: 0.02,
  sys: {
    pod: "d",
  },
  dt_txt: "2023-08-16 00:00:00",
};

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

const BG_COLORS = ["yellow", "orange", "red", "dark-red"];

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
        {/* <Forecast data={FORECAST_DATA} /> */}
        {forecasts.length
          ? forecasts.map((data) => <Forecast key={data.dt} data={data} />)
          : null}
      </ul>
    </div>
  );
}

export default App;
