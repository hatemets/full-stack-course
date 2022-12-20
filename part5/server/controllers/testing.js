const testRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

// Delete all entries from db
testRouter.post("/reset", async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

module.exports = testRouter
