const express = require("express")

const port = 3001
const app = express()

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/notes", (req, res) => {
    res.json(JSON.stringify({ name: "Jake" }))
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
