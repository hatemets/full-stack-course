import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({
    blogs,
    setBlogs,
    showNotification,
    blogFormRef
}) => {
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    const handleNewBlog = async (e) => {
        e.preventDefault()

        const newBlog = {
            title: newBlogTitle,
            url: newBlogUrl,
            likes: 0
        }

        try {
            const res = await blogService.create(newBlog)
            setBlogs(blogs.concat(res))
            showNotification({ message: "New blog created", type: "success" })
            blogFormRef.current.toggleVisibility()
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ backgroundColor: "#ddd" }}>
            <h3>New Blog</h3>
            <form onSubmit={handleNewBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name="title" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input name="url" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default BlogForm
