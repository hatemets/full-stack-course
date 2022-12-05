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

describe("initial users", () => {
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

    it("should display an error message in case of invalid user data", async () => {
        const initialUsers = await helper.usersInDatabase()

        const newUser = {
            username: "andrew",
            name: "jollar",
            password: "ab"
        }

        await api
            .post("")
            .send(newUser)
            .expect(403)
            .expect("Content-Type", /application\/json/)

        const newUsers = await helper.usersInDatabase()
        expect(newUsers).toHaveLength(initialUsers.length)

        const usernames = newUsers.map(user => user.username)
        expect(usernames).not.toContain(newUser.username)
    })

    it("should display an error message in case of a repeating username", async () => {
        const initialUsers = await helper.usersInDatabase()

        const [first, second] = [
            {
                username: "andrew",
                name: "jollar",
                password: "abcde"
            },
            {
                username: "andrew",
                name: "jollar",
                password: "newpass"
            }
        ]

        await api
            .post("")
            .send(first)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        await api
            .post("")
            .send(second)
            .expect(400)

        const newUsers = await helper.usersInDatabase()
        expect(newUsers).toHaveLength(initialUsers.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
