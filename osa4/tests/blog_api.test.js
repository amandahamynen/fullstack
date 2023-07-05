const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(titles).toContain(
            'Go To Statement Considered Harmful'
        )
    })

    test('blogs id-field is named correctly', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Title of some blog',
            author: 'Some new Author',
            url: 'http://localhost:3003',
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Title of some blog'
        )
    })

    test('blog without info is not added', async () => {
        const newBlog = {}
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('if value for likes is not set, likes is set to zero', async () => {
        const newBlog = {
            title: 'Title of Blog without Likes set',
            author: 'Author',
            url: 'http://localhost:3003'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const likesOfLastBlog = blogsAtEnd[blogsAtEnd.length - 1].likes
        expect(likesOfLastBlog).toEqual(0)
    })

    test('blog without title or url is not added', async () => {
        const newBlog = {
            author: 'Author of some blog',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog', () => {
    test('updating likes of a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes += 1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toEqual(8)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})