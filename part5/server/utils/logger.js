const util = require("util")

const info = (...params) => {
    if (process.env.NODE_ENV !== "test") { 
        console.log(util.inspect(...params, false, null))
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== "test") { 
        console.error(util.inspect(...params, false, null))
    }
}

module.exports = {
    info,
    error
}
