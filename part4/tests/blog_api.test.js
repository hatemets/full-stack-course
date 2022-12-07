const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const api = supertest(app)

const getToken = (user) => {
    const tokenContent = { username: user.username, id: user._id }
    return jwt.sign(tokenContent, process.env.SECRET)
}

// Create initial users and posts for predictable outcomes
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (const user of helper.initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        // Exclude password
        const { password: _, ...userObject } = user

        await new User({
            ...userObject,
            passwordHash
        }).save()
    }

    const user = await User.findOne({ username: helper.initialUsers[0].username })

    // Assign all initial blogs to the first user
    for (const initialBlog of helper.initialBlogs) {
        const blog = new Blog({
            ...initialBlog,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = await user.blogs.concat(savedBlog.id)
    }

    await user.save()
})

describe("token-based blog api", () => {
    it("should return blogs as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    it("should have the correct number of blogs", async () => {
        const res = await api.get("/api/blogs")
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    it("should be about the author's day", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].title).toBe("My day")
    })

    it("should have an id property", async () => {
        const response = await api.get("/api/blogs")
        const contents = await response.body
        contents.forEach(content => expect(content.id).toBeDefined())
    })

    it("should add a blog successfully", async () => {
        const initialBlogs = await helper.blogsInDatabase()
        const user = await User.findOne({})
        const token = await getToken(user)

        const blog = {
            title: "new blog",
            url: "https://john.123",
            user: user._id,
            likes: 0
        }

        await api
            .post("/api/blogs")
            .send(blog)
            .set({ "Authorization": `bearer ${token}` })

        const newBlogs = await helper.blogsInDatabase()

        expect(newBlogs).toHaveLength(initialBlogs.length + 1)
        expect(newBlogs.find(blog => blog.title === "new blog")).toBeDefined()
    }, 3000)

    test("blog post with undefined likes defaults to 0", async () => {
        const user = await User.findOne({})
        const token = getToken(user)

        const blogContent = {
            title: "new blog",
            url: "https://john.123",
            user: user._id
        }

        await api
            .post("/api/blogs")
            .send(blogContent)
            .set({ "Authorization": `bearer ${token}` })

        const res = await api.get("/api/blogs")
        expect(res.body[res.body.length - 1].likes).toBe(0)
    })

    test("blog post with url missing returns a bad request", async () => {
        const blogContent = {
            title: "new blog",
            likes: 5
        }

        await api
            .post("/api/blogs")
            .send(blogContent)
            .expect(401)
    })

    it("should delete a post successfully", async () => {
        const initialRes = await api.get("/api/blogs")
        const initialLength = initialRes.body.length
        const token = getToken(await User.findOne({}))

        await api
            .delete("/api/blogs/" + initialRes.body[0].id)
            .set({ "Authorization": `bearer ${token}` })

        const updatedRes = await api.get("/api/blogs")
        expect(updatedRes.body.length).toBe(initialLength - 1)
    })

    it("should update the blog post sucessfully", async () => {
        const blog = await Blog.findOne({ title: helper.initialBlogs[0].title })
        const newTitle = "New title"
        blog["title"] = newTitle

        await api.put(`/api/blogs/${blog.id}`).send(blog)

        const updatedBlog = await Blog.findOne({ title: newTitle })
        expect(updatedBlog).toBeDefined()
    })

    it("should fail when adding a blog without proper authorization", async () => {
        const user = User.findOne({})

        const newBlog = {
            title: "new blog",
            url: "newblog.com",
            likes: 5,
            user: user._id
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
