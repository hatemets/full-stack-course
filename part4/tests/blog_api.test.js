const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../index")
const Blog = require("../models/blog")
const api = supertest(app)

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

// Ensure that the test database always has the same state
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}, 15000)

test("there are two blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(2)
})

test("the first blog is about author's day", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].title).toBe("My day")
})

afterAll(() => {
    mongoose.connection.close()
})
