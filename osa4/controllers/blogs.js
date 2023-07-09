const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({
            error: 'title, author or url missing'
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() !== user._id.toString() ) {
        return response.status(401).json({ error: 'unauthorized user token' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

blogsRouter.put('/:id',  async (request, response) => {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
        { title, author, url, likes },
        { new: true }
    )

    if (updatedBlog) {
        response.json(updatedBlog.toJSON())
    } else {
        response.status(404).end
    }
})

module.exports = blogsRouter