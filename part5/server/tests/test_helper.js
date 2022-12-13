const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const initialBlogs = [
    {
        title: "My day",
        url: "https://someblog.abc",
        likes: 4
    },
    {
        title: "First date",
        url: "https://dingdong.com",
        likes: 7
    },
    {
        title: "How to make money",
        url: "https://ooga.xyz",
        likes: 6
    }
]

const initialUsers = [
    {
        username: "jax",
        name: "Jaxus",
        password: "dog123",
        blogs: []
    },
    {
        username: "kata",
        name: "Katarina",
        password: "hihihoho",
        blogs: []
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
