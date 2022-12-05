const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const api = supertest(app)
const helper = require("./test_helper")

// Ensure that the test database always has the same state
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
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
    const initialBlogs = await helper.blogsInDatabase()

    const blogContent = {
        title: "new blog",
        author: "john",
        url: "https://john.123",
        likes: 0
    }

    await api
        .post("/api/blogs")
        .send(blogContent)

    const newBlogs = await blogsInDatabase()
    expect(newBlogs).toHaveLength(initialBlogs.length + 1)
})

test("blog post with undefined likes defaults to 0", async () => {
    const blogContent = {
        title: "new blog",
        author: "john",
        url: "https://john.123"
    }

    await api
        .post("/api/blogs")
        .send(blogContent)

    const res = await api.get("/api/blogs")
    expect(res.body[res.body.length - 1].likes).toBe(0)
})

test("blog post with url or author missing returns a bad request", async () => {
    const blogContent = {
        title: "new blog",
        likes: 5
    }

    await api
        .post("/api/blogs")
        .send(blogContent)
        .expect(400)
})

it("should delete a post successfully", async () => {
    const initialRes = await api.get("/api/blogs")
    const initialLength = initialRes.body.length

    await api.delete(`/api/blogs/${initialRes.body[0].id}`).expect(204)
    const updatedRes = await api.get("/api/blogs")
    expect(updatedRes.body.length).toBe(initialLength - 1)
})

it("should update the blog post sucessfully", async () => {
    const initialRes = await api.get("/api/blogs")
    const blog = initialRes.body[0]
    blog["author"] = "unga bunga"

    await api.put(`/api/blogs/${blog.id}`).send(blog)

    const updatedRes = await api.get("/api/blogs")
    const updatedBlog = updatedRes.body.find(el => el.id === blog.id)
    expect(updatedBlog.author).toBe("unga bunga")
})

afterAll(() => {
    mongoose.connection.close()
})
