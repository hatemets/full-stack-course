const express = require("express")
const cors = require("cors")
const Blog = require("./models/blog")
require("dotenv").config()

const app = express()
const port = process.env.port || 3001

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})
.post("/api/blogs", (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
