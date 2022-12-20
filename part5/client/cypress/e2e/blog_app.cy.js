describe("Blog app", function() {
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

    describe("Login", function() {
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
})
