const Show = ({ country, setFilter, setFilteredCountries }) => {
    const handleShow = () => {
      setFilter(country.toLowerCase())
      setFilteredCountries([country])
    }
    return (
      <button onClick={handleShow}>
        show
      </button>
    )
  } 

export default Show