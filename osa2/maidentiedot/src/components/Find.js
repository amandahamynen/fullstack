const Find = ({ handleFiltering }) => {
    return (
        <div>
            Find countries <input onChange={handleFiltering}></input>
        </div>
    )

}

export default Find