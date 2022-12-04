const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
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

test("all blog posts have an id property", async () => {
    const response = await api.get("/api/blogs")
    const contents = await response.body
    contents.forEach(content => expect(content.id).toBeDefined())
})

test("adding a blog works", async () => {
    const blogContent = {
        title: "new blog",
        author: "john",
        url: "https://john.123",
        likes: 0
    }

    await api
        .post("/api/blogs")
        .send(blogContent)

    const res = await api.get("/api/blogs")
    expect(res.body.length).toBe(3)
})

afterAll(() => {
    mongoose.connection.close()
})
