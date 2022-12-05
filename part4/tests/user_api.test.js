const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

// Set initial state of db
beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe("when there's a single user in the database", () => {
    it("should successfully create a new user", async () => {
        const initialUsers = await helper.usersInDatabase()

        const newUser = {
            username: "newuser929",
            name: "jollar",
            password: "mypass123"
        }

        await api
            .post("")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const newUsers = await helper.usersInDatabase()
        expect(newUsers).toHaveLength(initialUsers.length + 1)

        const usernames = newUsers.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
