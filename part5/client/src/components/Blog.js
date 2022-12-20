import { useState } from "react"

const Blog = ({
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
        <li
            style={styles}
            key={id}
            id={Math.round(Math.random() * Math.pow(10, 6))}
        >
            <div className="preview">
                <p>Title: {title}</p>
                <p>Author: {user.name}</p>
            </div>

            {
                expanded ?
                    <div className="expanded-content">
                        <p>Url: {url}</p>
                        <p>Likes: {likes} <button className="like-button" onClick={() => handleLike(id)}>Like</button></p>
                        <button
                            className="delete"
                            style={{
                                backgroundColor: "crimson",
                                color: "#ddd",
                                fontWeight: "bold"
                            }}
                            onClick={() => handleBlogDeletion(id)}
                        >Delete</button>
                        <button
                            className="close-button"
                            onClick={toggleExpansion}
                        >Close</button>
                    </div>
                    : <button
                        className="expand-button"
                        onClick={toggleExpansion}
                    >View</button>
            }
        </li>
    )
}

export default Blog
