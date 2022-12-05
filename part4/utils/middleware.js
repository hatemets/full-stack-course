const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

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

const userExtractor = async (req, res, next) => {
    // The request contains the token, from which we need to get the user id
    // No extra information about the user is not provided
    if (req.body.token) {
        const decodedToken = jwt.verify(req.body.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)

        req.body.user = user
    }

    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
