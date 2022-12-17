const Blog = require("../models/blog")
const blogsRouter = require("express").Router()

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", "-blogs")
    res.json(blogs)
})

blogsRouter.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("user", "-blogs")
    res.json(blog)
})

blogsRouter.post("/", async (req, res) => {
    const { user, body } = req
    const { title, url, likes } = body

    if (!user) {
        return res.status(401).json({ error: "token missing" })
    }

    const blog = new Blog({
        title,
        url,
        likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    const user = req.user

    if (!user) {
        return res.status(403).json({ error: "missing user data" })
    }
    else if (!blog.user.id || blog.user.toString() !== user.id.toString()) {
        return res.status(403).json({ error: "insufficient privileges to delete the post" })
    }

    const result = await blog.delete()
    const status = (result) ? 204 : 404

    res.status(status).end()
})

blogsRouter.put("/:id", async (req, res, next) => {
    const newBlog = {
        title: req.body.title,
        likes: req.body.likes,
        url: req.body.url,
        user: req.body.user
    }

    await Blog.findByIdAndUpdate(req.params.id, newBlog)

    res.json(newBlog)
})

module.exports = blogsRouter
