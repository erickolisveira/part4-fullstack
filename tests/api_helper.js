const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: "Test1",
    author: "Erick oliveira",
    url: "aaa.com.br",
    likes: 0
  },
  {
    title: "Test2",
    author: "Tiago oliveira",
    url: "bbb.com.br",
    likes: 1
  }
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, getBlogs
}