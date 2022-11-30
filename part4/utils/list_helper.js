const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((currLikes, total) => currLikes + total, 0)

const favoriteBlog = (blogs) => blogs.reduce((curr, max) => curr.likes > max.likes ? curr : max)


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
