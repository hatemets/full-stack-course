const Blog = require("../models/blog")
const User = require("../models/user")
const blogsRouter = require("express").Router()

blogsRouter.get("/api/blogs", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", "-blogs")
    res.json(blogs)
})

blogsRouter.post("/api/blogs", async (req, res) => {
    const user = await User.findOne({})

    const blog = new Blog({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        likes: req.body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    res.status(201).json(savedBlog)
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
