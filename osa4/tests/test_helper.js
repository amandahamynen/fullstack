const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        _id: '64a027af8eb7c55588d16f17',
        username: 'ArtoHellas',
        name: 'Arto Hellas',
        password: 'password123',
    },
    {
        _id: '64a027af8eb7c55588d16f18',
        username: 'AdaLovelace',
        name: 'Ada Lovelace',
        password: 'password12345',
    },
]

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: initialUsers[0]._id,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: initialUsers[0]._id,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: initialUsers[0]._id,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'This is a Blog Title',
        author: 'Someone',
        url: 'http://localhost:3003',
        likes: 1,
        user: initialUsers[0]._id,
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}