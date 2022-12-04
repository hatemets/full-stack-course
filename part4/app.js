const express = require("express")
const cors = require("cors")
const Blog = require("./models/blog")
const config = require("./utils/config")
const mongoose = require("mongoose")

const usersRouter = require("./controllers/users")
const blogsRouter = require("./controllers/blogs")

require("express-async-errors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(usersRouter)
app.use(blogsRouter)
const { mongoUrl, port } = config

console.log("Connecting to", mongoUrl)

mongoose
    .connect(mongoUrl)
    .then(result => console.log("Connection established"))
    .catch(err => console.error(err))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app
