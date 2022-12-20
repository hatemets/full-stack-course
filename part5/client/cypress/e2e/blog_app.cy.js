import "../support/commands"

describe("blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")

        const newUser = {
            username: "testuser",
            name: "donald",
            password: "test123"
        }
        cy.request("POST", "http://localhost:3001", newUser)

        cy.visit("http://localhost:3000")
    })

    it("should display login form", function() {
        cy.visit("http://localhost:3000")
        cy.get("label[for='username']").should("contain", "Username")
        cy.get("label[for='password']").should("contain", "Password")
    })

    describe("login", function() {
        it("succeeds with correct credentials", function() {
            cy.get("input#username").type("testuser")
            cy.get("input#password").type("test123")
            cy.get("button[type='submit']").click()

            cy.contains("testuser logged in")
            cy.contains("Log out")
            cy.contains("New blog")
        })

        it("fails with incorrect credentials", function() {
            cy.get("input#username").type("testuser")
            cy.get("input#password").type("wrongpass123")
            cy.get("button[type='submit']").click()

            cy.contains("wrong credentials")
            cy.should("not.contain", "testuser logged in")
        })
    })

    describe("when logged in", function() {
        beforeEach(function() {
            cy.login({ username: "testuser", password: "test123" })
        })

        it("should let the user add a new blog", function() {
            cy.contains("New blog").click()
            cy.get("input#title").type("Test blog")
            cy.get("input#url").type("Test url")
            cy.get("button[type='submit']").click()

            cy.contains("Test blog")
            cy.contains("View")
        })

        it("should let the user like a blog", function() {
            cy.addBlog({ title: "Test blog", url: "Test url" })

            cy.get(".expand-button").click()
            cy.get(".like-button").click()

            cy.contains("Likes: 1")

            cy.get(".like-button").click()

            cy.contains("Likes: 2")
        })

        it("should let the user delete a blog they created", function() {
            cy.addBlog({ title: "Test blog", url: "Test url" })

            cy.get(".expand-button").click()
            cy.get(".delete").click()

            cy.get("ul.blogs").should("not.contain", "Test blog")
        })

        it.only("should order blogs by likes", function() {
            cy.addBlog({ title: "Blog 1", url: "Test url" })
            cy.addBlog({ title: "Blog 2", url: "Test url" })
            cy.addBlog({ title: "Blog 3", url: "Test url" })
            cy.addBlog({ title: "Blog 4", url: "Test url" })

            for (let i = 0; i < 4; ++i) {
                cy.get(`li:nth-child(${i+1}) .expand-button`).click()
                cy.wait(200)
            }

            // 3 likes to blog 3
            cy.likeBlog(3)
            cy.likeBlog(1)
            cy.likeBlog(1)

            cy.get("li:nth-child(1)").should("contain", "Blog 3").should("contain", "Likes: 3")

            // 1 like to blog 4
            cy.likeBlog(4)

            cy.get("li:nth-child(2)").should("contain", "Blog 4").should("contain", "Likes: 1")

            // 4 likes to blog 1
            cy.likeBlog(3)
            cy.likeBlog(3)
            cy.likeBlog(2)
            cy.likeBlog(2)

            // Final order should be: blog 1, blog 3, blog 4, blog 2
            cy.get("li:nth-child(1)").should("contain", "Blog 1").should("contain", "Likes: 4")
            cy.get("li:nth-child(2)").should("contain", "Blog 3").should("contain", "Likes: 3")
            cy.get("li:nth-child(3)").should("contain", "Blog 4").should("contain", "Likes: 1")
            cy.get("li:nth-child(4)").should("contain", "Blog 2").should("contain", "Likes: 0")
        })
    })
})
