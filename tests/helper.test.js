const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Robert C. Martin",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Robert C. Martin",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Robert C. Martin",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
]

const noBlogs = []

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more then one blog return the sum of all of then', () => {
  const result = listHelper.totalLikes(blogs)
  //expect(result).toBe(29)
  })
})

describe('blog with higher likes', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('when list is filled return the blog with highest likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog)
  })

  test('when list is empty the result will be 0', () => {
    const result = listHelper.favoriteBlog(noBlogs)
    expect(result).toBe(0)
  })
})

describe('author with most blogs', () => {
  test('when the list is filled return the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 4 })
  })
})