import DeleteButton from "./DeleteButton"

const Persons = ({ names, handleDeleting }) => {
    return (
        <>
        <ul>
        {names.map(person => 
        <li key={person.id}>
          {person.name} {person.number} <DeleteButton handleDeleting={handleDeleting} id={person.id}/>
        </li>)
        }
        </ul>
        </>
    )
}

export default Persons