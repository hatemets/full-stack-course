const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const getToken = req => {
    // Get the authorization header from the request
    const auth = req.get("authorization")

    // Example header: Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        // Return the actual token
        return auth.substring(7)
    }

    return null
}

const tokenExtractor = (req, res, next) => {
    const token = getToken(req)
    req.body.token = token

    next()
}

module.exports = {
    tokenExtractor
}
