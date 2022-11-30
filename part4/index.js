const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()

const app = express()
const port = process.env.port || 3001

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

app.post('/api/blogs', (req, res) => {
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
