import axios from "axios"
import { useEffect, useState } from "react"
import server from "./services/server"

const Person = ({ person, setPersons, persons }) => {
    const { name, number, id } = person

    const handleDeletion = () => {
        window.confirm(`Delete ${name}?`)
        server.remove(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }

    return (
        <div>
            { name }, { number } <button onClick={handleDeletion}>Delete</button>
        </div>
    )
}

const NewPersonForm = ({ setError, newName, setMsg, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
    const onSubmit = e => {
        e.preventDefault()

        // Check for duplicate names
        if (persons.map(p => p.name.toLowerCase()).includes(newName.toLowerCase())) {
            const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

            // If the duplicate name has a new number, update the listing, otherwise notify the user
            if (newNumber !== foundPerson.number) {
                server
                    .update(foundPerson.id, { name: foundPerson.name, number: newNumber })
                    .then(res => res.data)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                        setError(false)
                        setMsg(`${foundPerson.name} updated`)
                    })
                    .catch(err => {
                        setError(true)
                        setMsg(`${foundPerson.name} is already removed from the server`)
                    })
            }
            else {
                setError(true)
                setMsg(`${newName} is already added to the phonebook`, true)
            }
        }
        else {
            const newPerson = { name: newName, number: newNumber }
            server
                .add(newPerson)
                .then(res => res.data)
                .then(newPerson => setPersons(persons.concat(newPerson)))

            setError(false)
            setMsg(`${newPerson.name} added`)
        }
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={e => setNewName(e.target.value)} />
            </div>
            <div>
                phone: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit" onClick={onSubmit}>add</button>
            </div>
        </form>
    )
}

const FilterPeopleForm = ({ persons, filtered, setFiltered }) => {
    const filterPeopleByName = query => {
        // Start filtering people once at least one character is typed
        if (query === "") {
            setFiltered([])
        }
        else {
            setFiltered(persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())))
        }
    }

    return (
        <>
            <div>
                Filter shown with <input onChange={e => { filterPeopleByName(e.target.value) }} />
            </div>
            <div>
                {
                    filtered.map(person => <Person key={person.name} person={person} />)
                }
            </div>
        </>
    )
}

const People = ({ persons, setPersons }) => {
    return <>
        <h2>People</h2>
        {
            persons.map(person => <Person key={person.name} setPersons={setPersons} persons={persons} person={person} />)
        }
    </>
}

const Notification = ({ msg, isError }) => {
    const color = isError ? "red" : "green"
    const styles = {
        wrapper: {
            position: "absolute",
            borderRadius: 32,
            top: "3rem",
            width: "80%",
            left: "10%",
            border: `2px solid ${color}`,
            background: "#eee"
        },
        text: {
            fontSize: "1.2rem",
            color: color,
            textAlign: "center"
        },
    }

    return msg.length > 0
        ? (
            <div style={styles.wrapper}>
                <h3 style={styles.text}>{ msg }</h3>
            </div>
        )
        : <></>
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filtered, setFiltered] = useState([])
    const [msg, setMsg] = useState("")
    const [isError, setError] = useState(false)

    useEffect(() => {
        // Display the notification for 4 seconds
        setTimeout(() => {
            setMsg("")
        }, 4000)
    }, [msg])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/persons")
            .then(res => res.data)
            .then(persons => setPersons(persons))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <FilterPeopleForm persons={persons} filtered={filtered} setFiltered={setFiltered} />
                <NewPersonForm setError={setError} setMsg={setMsg} newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons} setNewNumber={setNewNumber} newNumber={newNumber} />
            </div>
            <People persons={persons} setPersons={setPersons} />
            <Notification msg={msg} isError={isError} />
        </div>
    )
}

export default App
