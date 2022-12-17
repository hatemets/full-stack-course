import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import BlogForm from "../components/BlogForm"
import userEvent from "@testing-library/user-event"
import util from "util"

describe("BlogForm component", () => {
    it.only("should call handleNewBlog event handler with the correct details", async () => {
        const handleNewBlog = jest.fn(e => e.preventDefault())
        const user = userEvent.setup()

        const { container } = render(<BlogForm handleNewBlog={handleNewBlog} />)

        const titleField = container.querySelector("#title")
        const urlField = container.querySelector("#url")
        const submitButton = container.querySelector(".save")

        await user.type(titleField, "Test blog")
        await user.type(urlField, "https://www.uugans.buugans")
        await user.click(submitButton)

        expect(handleNewBlog.mock.calls).toHaveLength(1)
        expect(handleNewBlog.mock.calls[0][0].target.elements[0].value).toBe("Test blog")
        expect(handleNewBlog.mock.calls[0][0].target.elements[1].value).toBe("https://www.uugans.buugans")
    })
})
