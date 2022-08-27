const express = require("express")
const cors = require("cors")

const app = express()
const port = 3001

// Use cross-origin resource sharing (otherwise it wouldn't work on Mozilla Firefox)
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/persons", (req, res) => {
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

    res.json(people)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

