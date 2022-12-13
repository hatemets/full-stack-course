require("dotenv").config()

const mongoUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const port = process.env.PORT || 3001

module.exports = {
    mongoUrl,
    port
}
