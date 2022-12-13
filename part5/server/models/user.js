const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v

        // passwordHash should not be displayed publicly
        delete obj.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
