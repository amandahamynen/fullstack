import Show from "./Show"

const DisplayCountry = ({ countries, filter, countriesInfo, setFilter, setFilteredCountries, setInfo }) => {
    if (filter === "") {
      return (
        null
      )
    }
    if(countries.length > 10) {
      return (
      <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length <= 10 && countries.length > 1) {
      return (
        countries.map(country => 
          <p key={country}>
            {country} 
            <Show 
            country={country} 
            setFilter={setFilter} 
            setFilteredCountries={setFilteredCountries}
            />
          </p>
        )
      )
    } else if (countries.length === 1){
      const info = countriesInfo.find(country => country.name.common === countries[0])
        setInfo(info)
        return (
            <div>
                <h1>{info.name.common}</h1>
                <p>Capital: {info.capital}</p>
                <p>Area: {info.area}</p>
                <h3>Languages:</h3>
                <ul>
                  {console.log(info.languages)}
                  {Object.values(info.languages).map(language =>
                    <li key={language}>
                      {language}
                    </li>)}
                </ul>
                <img src={info.flags.png} alt={'?'}/>
            </div>
        )
    }
}

export default DisplayCountry