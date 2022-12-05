const Blog = require("../models/blog")
const blogsRouter = require("express").Router()

blogsRouter.get("/api/blogs", (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post("/api/blogs", (req, res) => {
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

blogsRouter.delete("/api/blogs/:id", async (req, res, next) => {
    const result = await Blog.findByIdAndDelete(req.params.id)
    const status = (result) ? 204 : 404

    res.status(status).end()
})

blogsRouter.put("/api/blogs/:id", async (req, res, next) => {
    const newBlog = {
        author: req.body.author,
        title: req.body.title,
        likes: req.body.likes,
        url: req.body.url,
    }

    await Blog.findByIdAndUpdate(req.params.id, newBlog)

    res.json(newBlog)
})

module.exports = blogsRouter
