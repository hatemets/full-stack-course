const express = require("express")
const cors = require("cors")

const app = express()
const port = 3001

const people = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

// Use cross-origin resource sharing (otherwise it wouldn't work on Mozilla Firefox)
app.use(cors())

// Necessary for making POST requests via Postman
app.use(express.urlencoded())
app.use(express.json())

// GET
app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/persons", (req, res) => {
    res.json(people)
})

app.get("/info", (req, res) => {
    let content = `<p>Phonebook has info about ${people.length} people<p>`
    content += `<p>${Date()}</p>`

    res.send(content)
})

app.get("/api/persons/:id", (req, res) => {
    const person = people.find(p => p.id === Number(req.params.id))
    res.status(404)
    res.send(person ? person : `User with id ${req.params.id} not found`)
})


// DELETE
app.delete("/api/persons/:id", (req, res) => {
    const person = people.find(person => person.id === Number(req.params.id))

    if (person) {
        // Remove the person from the array
        people.splice(people.indexOf(person), 1)
        res.send(`Person with id ${req.params.id} deleted successfully!`)
    }
    else {
        res.status(404)
        res.send(`There does not exist a person with id ${req.params.id}`)
    }
})


// POST
app.post("/api/persons", (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        res.status(404).send("Name and/or number missing")
    }
    else if (people.map(person => person.name.toLowerCase()).includes(name.toLowerCase())) {
        res.status(400).send("A person with this name already exists")
    }
    else {
        const newPerson = { name: req.body.name, number: req.body.number ? req.body.number : "" , id: Math.floor(Math.random() * Math.pow(10, 4)) }
        people.push(newPerson)
        res.status(201).send(`New person with id ${newPerson.id} created successfully!`)
    }
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
