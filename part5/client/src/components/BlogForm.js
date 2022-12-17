import { useState } from "react"

const BlogForm = ({ handleNewBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    return (
        <div style={{ backgroundColor: "#ddd" }}>
            <h3>New Blog</h3>
            <form onSubmit={handleNewBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newBlogTitle}
                        onChange={({ target }) => setNewBlogTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={newBlogUrl}
                        onChange={({ target }) => setNewBlogUrl(target.value)}
                    />
                </div>
                <button className="save" type="submit">Save</button>
            </form>
        </div>
    )
}

export default BlogForm
