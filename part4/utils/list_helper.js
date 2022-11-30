const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((currLikes, total) => currLikes + total, 0)

const favoriteBlog = (blogs) => blogs.reduce((curr, max) => curr.likes > max.likes ? curr : max)

const mostBlogs = blogs => {
    let bestAuthor = { name: "", blogs: 0 }
    const authors = {}

    blogs.forEach(blog => {
        authors[blog.author] = blog.author in authors ? authors[blog.author] + 1 : 1

        if (authors[blog.author] > bestAuthor.blogs) {
            bestAuthor.name = blog.author
            bestAuthor.blogs = authors[blog.author]
        }
    })

    return bestAuthor
}

const mostLikes = blogs => {
    let bestAuthor = { name: "", likes: 0 }
    const authors = {}

    blogs.forEach(blog => {
        authors[blog.author] = blog.author in authors ? authors[blog.author] + blog.likes : blog.likes

        if (authors[blog.author] > bestAuthor.likes) {
            bestAuthor.name = blog.author
            bestAuthor.likes = authors[blog.author]
        }
    })

    return bestAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
