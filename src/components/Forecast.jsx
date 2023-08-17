const utcToLocal = (dateStr) => {
  const regex = /[0-9]+/g;
  const utcProps = dateStr.match(regex);
  const localTime = new Date(Date.UTC(...utcProps)).toLocaleTimeString(
    "en-US",
    {
      hour12: false,
      hour: "2-digit",
    }
  );

  return localTime;
};

const getPeriodOfDay = (hour) => {
  switch (true) {
    case hour < 5 || hour > 21:
      return "night";
    case hour < 12:
      return "morning";
    case hour < 17:
      return "day";
    case hour < 21:
      return "evening";
    default:
      return "you're on the moon";
  }
};

const convertDegreeToCompassPoint = (wind_deg) => {
  const compassPoints = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const rawPosition = Math.floor(wind_deg / 22.5 + 0.5);
  const arrayPosition = rawPosition % 16;
  return compassPoints[arrayPosition];
};

const Forecast = ({ data, isFocused }) => {
  const temperature = Math.round(data.main.temp);
  const condition = data.weather[0].main;
  const windSpeed = Math.round(data.wind.speed);
  const windDirection = convertDegreeToCompassPoint(data.wind.deg);
  const localTime = utcToLocal(data.dt_txt);
  const timeOfDay = getPeriodOfDay(localTime);

  const expandedView = (
    <div>
      <p className="condition">{condition}</p>
      <p className="details">
        {"Wind: " + windDirection + " " + windSpeed + "mph"}
        <br />
        {"Humidity: 18%"}
      </p>
    </div>
  );

  return (
    <div className={`forecast-container ${timeOfDay}`}>
      <div>
        <i className="fa-solid fa-sun" />
      </div>
      <div className="weather-report">
        <h2 className="time">{timeOfDay}</h2>
        <p className="temp">{temperature + "°"}</p>
        {isFocused ? expandedView : null}
      </div>
    </div>
  );
};

export default Forecast;
