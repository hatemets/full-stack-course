const bcrypt = require("bcrypt")
const User = require("../models/user")
const usersRouter = require("express").Router()

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs")
    res.json(users)
})

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = await req.body

    if (!password || password.length < 3) {
        return res.status(403).json({ error: "Password must be at least 3 characters in length" })
    }

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

module.exports = usersRouter
