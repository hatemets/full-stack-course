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

app.delete("/api/blogs/:id", async (req, res, next) => {
    const result = await Blog.findByIdAndDelete(req.params.id)
    const status = (result) ? 204 : 404
    res.status(status).end()
})

app.put("/api/blogs/:id", async (req, res, next) => {
    const newBlog = {
        author: req.body.author,
        title: req.body.title,
        likes: req.body.likes,
        url: req.body.url,
    }
    await Blog.findByIdAndUpdate(req.params.id, newBlog)
    res.json(newBlog)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app
