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

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(usersRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)

logger.info("Connecting to", config.mongoUrl)

mongoose
    .connect(config.mongoUrl)
    .then(result => logger.info("Connection established"))
    .catch(err => logger.error(err))

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`)
})

module.exports = app
