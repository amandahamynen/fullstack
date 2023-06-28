const DisplayWeather = ({ info, filteredCountries, weather }) => {
    if(info && weather && filteredCountries.length === 1) {
        return(
            <div>
                <h2>Weather in {info.capital}</h2>
                <p>Temperature {weather.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={'?'}/>
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
  }

export default DisplayWeather