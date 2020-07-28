const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const user = await User.findById(request.body.userId)
    
    const newBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes | 0,
        user: user._id
    }

    if(!newBlog.title || !newBlog.url) {
        return response.status(400).end()
    }
    const blog = new Blog(newBlog)

    const sentBlog = await blog.save()

    user.blogs = user.blogs.concat(sentBlog._id)
    await user.save()

    return response.status(201).json(sentBlog).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }catch(exception){
        return response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    try {
        const note = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.json(note.toJSON())
    }catch(exception) {
        response.status(400).end() 
    }
})

module.exports = blogsRouter
