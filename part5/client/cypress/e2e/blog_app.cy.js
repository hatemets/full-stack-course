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
            cy.login({
                username: "testuser",
                password: "test123"
            })
        })

        it("should let the user add a new blog", function() {
            cy.contains("New blog").click()
            cy.get("input#title").type("Test blog")
            cy.get("input#url").type("Test url")
            cy.get("button[type='submit']").click()

            cy.contains("Test blog")
            cy.contains("View")
        })

        it.only("should let the user like a blog", function() {
            cy.addBlog({
                title: "Test blog",
                url: "Test url"
            })

            cy.get(".expand-button").click()
            cy.get(".like-button").click()

            cy.contains("Likes: 1")

            cy.get(".like-button").click()

            cy.contains("Likes: 2")
        })
    })
})
