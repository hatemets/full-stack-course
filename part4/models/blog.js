const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGODB_URL

console.log("Connecting to", mongoUrl)

mongoose
    .connect(mongoUrl)
    .then(result => console.log("Connection established"))
    .catch(err => console.error(err))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model("Blog", blogSchema)
