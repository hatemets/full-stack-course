const bcrypt = require("bcrypt")
const User = require("../models/user")
const usersRouter = require("express").Router()

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = await req.body

    // Validate password before hashing
    if (!password || password.length < 3) {
        return res.status(403).json({ error: "Password must be at least 3 characters in length" })
    }

    // Username must be unique
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        return res.status(400).json({ error: "username already exists" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
})

usersRouter.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = usersRouter
