const Blog = require("../models/blog")

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

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDatabase
}
