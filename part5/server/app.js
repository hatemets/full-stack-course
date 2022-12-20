const express = require("express")
const cors = require("cors")
const config = require("./utils/config")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const loginRouter = require("./controllers/login")
const usersRouter = require("./controllers/users")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
require("express-async-errors")

const app = express()


logger.info(`Connecting to ${config.mongoUri}`)

mongoose
    .connect(config.mongoUri)
    .then(res => logger.info("Connection established"))
    .catch(err => logger.error(err))

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(usersRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    const testRouter = require("./controllers/testing")
    app.use("/api/testing", testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
