require("dotenv").config()

const mongoUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL

const port = process.env.PORT || 3001

module.exports = {
    mongoUrl,
    port
}
