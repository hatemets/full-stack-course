import { useState } from "react"
import blogService from "../services/blogs"

export const Blog = ({ blog }) => {
    const { id, title, url, likes, user } = blog
    const [expanded, setExpanded] = useState(false)

    const toggleExpansion = () => setExpanded(!expanded)

    const styles = {
        border: "1px solid #ccc",
        backgroundColor: "lightblue",
        borderRadius: 8,
        listStyleType: "none",
        margin: 8,
        padding: 10
    }

    const handleLike = async (e) => {
        try {
            const newBlog = {
                ...blog,
                user: user.id,
                likes: likes + 1
            }

            await blogService.update(id, newBlog)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <li style={styles} key={id}>
            <span>{title} </span>
            {
                expanded ?
                    <div>
                        <p>Url: {url}</p>
                        <p>Likes: {likes} <button onClick={handleLike}>Like</button></p>
                        <p>Author: {user.name}</p>
                        <button onClick={toggleExpansion}>Close</button>
                    </div>
                    : <button onClick={toggleExpansion}>View</button>
            }
        </li>
    )
}
