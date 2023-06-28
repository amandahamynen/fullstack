import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [namesToShow, setNamesToShow] = useState(persons)
  const [newNotification, setNotification] = useState(null)
  const [newErrorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNamesToShow(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...personExists, number: newNumber }
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNamesToShow(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName("")
            setNewNumber("")
            setNotification(
              `Number updated`
            )
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          })
          .catch((error) => {
               setErrorMessage(
                `Person '${personExists.name}' was already removed from server`
               )
               setTimeout(() => {
                setErrorMessage(null)
               }, 5000)
              setNewName("")
              setNewNumber("")            
          })
      }
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(person => person.name === newName)) { 
       alert(newName + ' is already added to phonebook')
       return
    }

    personService
      .create(nameObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNamesToShow(persons.concat(person))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        console.log('fail')
      })
      setNotification(
        `Added ${nameObject.name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 2000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setNewFilter(event.target.value.toLowerCase())
    if(event.target.value === "") {
      setNamesToShow(persons)
    } else {
      setNamesToShow(persons.filter(person => person.name.toLowerCase().match(event.target.value.toLowerCase())))
    }
  }

  const handleDeleting = (id) => {
    const personGettingDeleted = persons.find(n => n.id === id)
    const restOfPersons = persons.filter(person => person.id !== id)
    if (window.confirm(`Delete ${personGettingDeleted.name}?`)) {
      personService
      .deletePerson(id)
      .then(person => {
        setPersons(restOfPersons)
        setNamesToShow(restOfPersons)
        setNewName("")
        setNewNumber("")
        setNotification(
          `${personGettingDeleted.name} deleted`
        )
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch(error => {
        console.log('fail')
        setErrorMessage(
          `Person '${personGettingDeleted.name}' was already removed from server`
         )
         setTimeout(() => {
          setErrorMessage(null)
         }, 5000)
        setNewName("")
        setNewNumber("")
      })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification}/>
      <ErrorMessage message={newErrorMessage}/>
      <Filter 
        value={newFilter} 
        event={handleFiltering} 
        persons={persons} 
        namesToShow={namesToShow}
      />
      <h2>Add a new</h2>
      <PersonForm 
        event={addName} 
        name={newName} 
        handleNameChange={handleNameChange} 
        number={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        names={namesToShow}
        handleDeleting={handleDeleting}
      />
    </div>
  )

}

export default App