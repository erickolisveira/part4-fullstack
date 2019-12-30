const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0) 
}

const highest = (items, key) => {
  const max = items.reduce((prev, curr) => {
    return (prev[key] > curr[key] ? prev : curr)
  }, 0)
  return max
}

const favoriteBlog = (blogs) => {
  const max = highest(blogs, 'likes')
  const blog = {
    title: max.title,
    author: max.author,
    likes: max.likes
  }
  return blog.likes !== undefined ? blog : max
}

const mostBlogs = (blogs) => {
  let filteredAuthors = []
  blogs.map(item => {
    let blogItem = {author: item.author, blogs: 1}
    let found = filteredAuthors.find(authorItem => authorItem.author === blogItem.author)
    if(!found) {
      filteredAuthors.push(blogItem)
    }
    else {
      found.blogs++
    }
  })
  return highest(filteredAuthors, 'blogs')
}

const mostLikes = (blogs) => {
  let filteredAuthors = []
  blogs.map(item => {
    let blogItem = {author: item.author, likes: item.likes}
    let found = filteredAuthors.find(authorItem => authorItem.author === blogItem.author)
    if(!found) {
      filteredAuthors.push(blogItem)
    }
    else {
      found.likes += blogItem.likes
    }
  })
  return highest(filteredAuthors, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}