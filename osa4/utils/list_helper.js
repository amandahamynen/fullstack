var _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((previous, current) => previous.likes > current.likes ? previous : current)
    return blog
}

const mostBlogs = (blogs) => {
    const sum = _(blogs)
        .groupBy('author')
        .map((value, key) => ({
            author: key,
            blogs: value.length
        }))
        .value()

    const result = sum.reduce((previous, current) => previous.blogs > current.blogs ? previous : current)
    return result
}

const mostLikes = (blogs) => {
    const sum = _(blogs)
        .groupBy('author')
        .map((value, key) => ({
            author: key,
            likes: _.sumBy(value, 'likes')
        }))
        .value()

    const result = sum.reduce((previous, current) => previous.likes > current.likes ? previous : current)
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}