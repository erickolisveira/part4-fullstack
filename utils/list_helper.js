const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0) 
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes ? prev : curr)
  }, 0)
  const blog = {
    title: max.title,
    author: max.author,
    likes: max.likes
  }
  return blog.likes !== undefined ? blog : max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}