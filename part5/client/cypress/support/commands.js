Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3001/api/login", { username, password })
        .then(res => {
            localStorage.setItem("loggedUser", JSON.stringify(res.body))
            cy.visit("http://localhost:3000")
        })
})

Cypress.Commands.add("addBlog", ({
    title,
    url,
    userId
}) => {
    const newBlog = {
        title,
        url,
        user: userId
    }

    cy.request({
        method: "POST",
        url: "http://localhost:3001/api/blogs",
        body: newBlog,
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`
        }
    })

    cy.visit("http://localhost:3000")
})
