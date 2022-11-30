const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.map(blog => blog.likes).reduce((currLikes, total) => currLikes + total, 0)

module.exports = {
    dummy,
    totalLikes
}
