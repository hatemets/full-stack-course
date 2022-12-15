export const Blog = ({ blog, id }) => {
    const { title, author, url, likes } = blog

    return (
        <li key={id}>
            <h4>{title} - {author}</h4>
        </li>
    )
}
