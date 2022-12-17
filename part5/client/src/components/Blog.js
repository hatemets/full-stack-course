import { useState } from "react"

export const Blog = ({
    blog,
    handleLike,
    handleBlogDeletion
}) => {
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

    return (
        <li style={styles} key={id}>
            <span>{title} </span>
            {
                expanded ?
                    <div>
                        <p>Url: {url}</p>
                        <p>Likes: {likes} <button onClick={() => handleLike(id)}>Like</button></p>
                        <p>Author: {user.name}</p>
                        <button
                            style={{
                                backgroundColor: "crimson",
                                color: "#ddd",
                                fontWeight: "bold"
                            }}
                            onClick={() => handleBlogDeletion(id)}
                        >Delete</button>
                        <button onClick={toggleExpansion}>Close</button>
                    </div>
                    : <button onClick={toggleExpansion}>View</button>
            }
        </li>
    )
}
