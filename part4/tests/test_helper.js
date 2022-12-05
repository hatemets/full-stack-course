const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const initialBlogs = [
    {
        title: "My day",
        author: "Jake",
        url: "https://someblog.abc",
        likes: 32
    },
    {
        title: "First date",
        author: "Donald",
        url: "https://dingdong.abc",
        likes: 17
    }
]

const initialUsers = [
    {
        username: "jax",
        name: "Jaxus",
        password: "dog123" 
    },
    {
        username: "kata",
        name: "Katarina",
        password: "hihihoho"
    }
]

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDatabase,
    usersInDatabase
}
