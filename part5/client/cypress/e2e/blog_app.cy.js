describe("Blog app", () => {
    it("Front page is shown", () => {
        cy.visit("http://localhost:3000")
        cy.contains("Blogs")
    })
})
