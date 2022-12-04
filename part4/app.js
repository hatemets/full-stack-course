const express = require("express")
const cors = require("cors")
const Blog = require("./models/blog")
const config = require("./utils/config")
const mongoose = require("mongoose")
require("express-async-errors")

const app = express()
app.use(cors())
app.use(express.json())
const { mongoUrl, port } = config

console.log("Connecting to", mongoUrl)

mongoose
    .connect(mongoUrl)
    .then(result => console.log("Connection established"))
    .catch(err => console.error(err))

app.get("/", (req, res) => {
    res.send("hello Gretsu")
})

app.get("/api/blogs", (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

app.post("/api/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app
