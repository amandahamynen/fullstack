const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://amandahamynen:${password}@cluster0.am5gxap.mongodb.net/testBlogilista?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

console.log('here')

const blog = new Blog({
    title: 'Title of second blog',
    author: 'Some Author2',
    url: 'http://localhost:3003',
    likes: 20,
})

blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
})

Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
})