const bcrypt = require("bcrypt")
const User = require("../models/user")

describe("when there's a single user in the database", () => {
    // Set initial state of db
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrpyt.hash("dog123", 10)
        const user = new User({
            username: "root",
            passwordHash
        })

        await user.save()
    })

    it("should successfully create a new user", async () => {
        // const initialUsers = await helper.usersInDatabase()

        const newUser = {
            username: "unga",
            name: "jollar",
            password: "mypass123"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        // const newUsers = await helper.usersInDatabase()
        // expect(newUsers).toHaveLength(initialUsers.length + 1)

        // const usernames = newUsers.map(user => user.username)
        // expect(usernames).toContain(newUser.username)
    })
})
