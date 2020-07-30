const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
  {
    title: "Teste n1",
    author: "Erick oliveira",
    url: "aaa.com.br",
    likes: 0
  },
  {
    title: "Teste n2",
    author: "Tiago oliveira",
    url: "bbb.com.br",
    likes: 1
  }
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, getBlogs, getUsers
}