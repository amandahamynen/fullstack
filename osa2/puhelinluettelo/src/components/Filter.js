const Filter = ({ value, event }) => {
    return (
        <>
        filter shown with <input value={value} onChange={event}/>
        </>
    )
}

export default Filter