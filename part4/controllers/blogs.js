const Blog = require("../models/blog")
const User = require("../models/user")
const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", "-blogs")
    res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(body.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: "invalid or missing token" })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res, next) => {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: "invalid or missing token" })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if (!blog.user.id || blog.user.toString() !== user.id.toString()) {
        return res.status(403).json({ error: "insufficient privileges to delete the post" })
    }

    const result = await blog.delete()
    const status = (result) ? 204 : 404

    res.status(status).end()
})

blogsRouter.put("/:id", async (req, res, next) => {
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
