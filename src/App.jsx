import { useState } from "react";
import Forecast from "./components/Forecast";
import Form from "./components/Form";

const API_KEY = import.meta.env.VITE_API_KEY;

const FORECAST_DATA = [
  {
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
    dt_txt: "2023-08-16 15:00:00",
  },
  {
    dt: 1692144003,
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
    dt_txt: "2023-08-16 18:00:00",
  },
  {
    dt: 1692144001,
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
    dt_txt: "2023-08-16 21:00:00",
  },
  {
    dt: 1692144002,
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
  },
];

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

const handleClick = (e) => {
  console.log('click', e);
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [forecasts, setForecasts] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (searchInput !== "") {
    // const data = await getCoordinatesFromCityName(searchInput);
    // const forecastData = await getForecast(data.lat, data.lon);

    // setForecasts(forecastData.list);
    // }
    setForecasts(FORECAST_DATA);
  };

  const forecastsView = forecasts.map((data, index) => {
    return (
      <li key={data.dt} onClick={() => handleClick(data)}>
        <Forecast data={data} />
      </li>
    );
  });

  return (
    <div className="app">
      <Form
        searchInput={searchInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ul className="forecasts-list">{forecastsView}</ul>
    </div>
  );
}

export default App;
