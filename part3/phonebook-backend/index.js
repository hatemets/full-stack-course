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


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
