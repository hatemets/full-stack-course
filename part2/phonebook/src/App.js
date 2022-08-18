import { useState } from "react"

const Person = ({ person }) => {
    const { name, number } = person
    return (
        <div>
            <h4>{ name }, { number }</h4>
        </div>
    )
}

const NewPersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
    const onSubmit = e => {
        e.preventDefault()

        // Check for duplicate names
        if (persons.map(p => p.name).includes(newName)) {
            setNewName("")
            setNewNumber("")
            alert(`${newName} is already added to the phonebook`)
        }
        else {
            setPersons([...persons, { name: newName, number: newNumber }])
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


const FilterPeopleForm = ({ persons, setPersons, filtered, setFiltered }) => {
    const filterPeopleByName = query => {
        // Start filtering people once at least one character is typed
        query !== "" && setFiltered(persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())))
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

const People = ({ persons }) => {
    return <>
        <h2>People</h2>
        {
            persons.map(person => <Person key={person.name} person={person} />)
        }
    </>
}


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filtered, setFiltered] = useState([])


    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <FilterPeopleForm persons={persons} setPersons={setPersons} filtered={filtered} setFiltered={setFiltered} />
                <NewPersonForm newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons} setNewNumber={setNewNumber} newNumber={newNumber} />
            </div>
            <People persons={persons} />
        </div>
    )
}

export default App
