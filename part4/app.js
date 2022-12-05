const express = require("express")
const cors = require("cors")
const config = require("./utils/config")
const mongoose = require("mongoose")
const logger = require("./utils/logger")

const usersRouter = require("./controllers/users")
const blogsRouter = require("./controllers/blogs")

require("express-async-errors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(usersRouter)
app.use(blogsRouter)
const { mongoUrl, port } = config

logger.info("Connecting to", mongoUrl)

mongoose
    .connect(mongoUrl)
    .then(result => logger.info("Connection established"))
    .catch(err => logger.error(err))

app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
})

module.exports = app
