import { useState, useEffect } from "react"
import axios from "axios"
import DisplayWeather from "./components/DisplayWeather"
import DisplayCountry from "./components/DisplayCountry"
import Find from "./components/Find"

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")
  const [countryNames, setCountryNames] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [info, setInfo] = useState(null)
  const [weather, setWeather] = useState("")

  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"

  const getAll = () => {
      const request = axios.get(baseURL)
      return request.then(response => response.data)
  }

  useEffect(() => {
    getAll()
    .then(response => {
      setCountries(response)
      setCountryNames(response.map(country => country.name.common))
    })
  }, [])

  useEffect(() => {
   if(info) {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${info.capital}&appid=${api_key}&units=metric`)
    .then(response => response.data)
    .then(response => {
      setWeather(response)
     })
   }
 }, [info])
    

  const handleFiltering = (event) => {
    event.preventDefault()
    const value = event.target.value.toLowerCase()
    setNewFilter(value)
    setFilteredCountries(countryNames.filter(country => country.toLowerCase().includes(value)))
  }

  return (
    <>
      <Find handleFiltering={handleFiltering}/>
      <DisplayCountry 
      countries={filteredCountries}
      filter={newFilter}
      countriesInfo={countries}
      setFilter={setNewFilter}
      setFilteredCountries={setFilteredCountries}
      setInfo={setInfo}
      />
      <DisplayWeather info={info} filteredCountries={filteredCountries} weather={weather}/>
    </>
  )
}

export default App