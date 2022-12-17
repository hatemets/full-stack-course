import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "../components/Blog"
import userEvent from "@testing-library/user-event"

const testBlog = {
    title: "Test blog",
    url: "https://www.uugans.buugans",
    user: {
        name: "Jake",
        id: 2
    },
    likes: 15,
    id: 1

}

describe("Blog component", () => {
    it("should only render blog's title and author by default", async () => {
        const mockHandler = jest.fn()

        const { container } = render(
            <Blog
                blog={testBlog}
                key={testBlog.id}
                handleLike={mockHandler}
                handleBlogDeletion={mockHandler}
            />)

        const titleElement = screen.getByText("Test blog", { exact: false })
        const authorElement = screen.getByText("Jake", { exact: false })
        expect(titleElement).toBeDefined()
        expect(authorElement).toBeDefined()

        const expandedContent = container.querySelector(".expanded-content")
        expect(expandedContent).toBeFalsy()
    })

    it("should also render blog's likes and url once expanded", async () => {
        const mockHandler = jest.fn()
        const user = userEvent.setup()

        const { container } = render(
            <Blog
                blog={testBlog}
                key={testBlog.id}
                handleLike={mockHandler}
                handleBlogDeletion={mockHandler}
            />)

        const expandButton = container.querySelector(".expand-button")
        await user.click(expandButton)

        const expandedContent = container.querySelector(".expanded-content")
        expect(expandedContent).toBeDefined()

        const urlElement = screen.getByText(testBlog.url, { exact: false })
        const likesElement = screen.getByText(testBlog.likes, { exact: false })

        expect(urlElement).toBeDefined()
        expect(likesElement).toBeDefined()
    })

    it("should register two likes when the like button is clicked twice", async () => {
        const handleLike = jest.fn()
        const handleDeletion = jest.fn()
        const user = userEvent.setup()

        const { container } = render(
            <Blog
                blog={testBlog}
                key={testBlog.id}
                handleLike={handleLike}
                handleBlogDeletion={handleDeletion}
            />)

        const expandButton = container.querySelector(".expand-button")
        await user.click(expandButton)

        const likeButton = container.querySelector(".like-button")

        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})
