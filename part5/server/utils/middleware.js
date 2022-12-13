const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const logger = require("./logger")

const requestLogger = (req, res, next) => {
    logger.info(`Methods: ${req.method}    Path: ${req.path}    Body: ${JSON.stringify(req.body)}`)
    next()
}

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
    const auth = req.get("authorization")

    // The request contains the token, from which we need to get the user id
    // No extra information about the user is provided
    if (auth && auth.toLowerCase().startsWith("bearer")) {
        const token = auth.substring(7)

        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            req.user = await User.findById(decodedToken.id) 
        }
        else {
            res.status(401).json({ error: "token missing" })
        }
    }

    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    switch (err.name) {
        case "CastError": {
            res.status(400).json({ error: "malformatted id" })
            break
        }
        case "ValidationError": {
            res.status(400).json({ error: err.message })
            break
        }
        case "JsonWebTokenError": {
            res.status(400).json({ error: "invalid token" })
            break
        }
        case "TokenExpiredError": {
            res.status(400).json({ error: "token expired" })
            break
        }
        case "TokenMissingError": {
            res.status(401).json({ error: "token missing" })
            break
        }
        default: {
            res.status(500).json({ error: err.message })
            break
        }
    }

    next()
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}
