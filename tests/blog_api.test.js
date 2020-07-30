const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./api_helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Blog = require("../models/Blog");
const User = require("../models/User");

let USER = "";
let USER_TOKEN = "";

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("admin", 10);
  const user = new User({ username: "admin", passwordHash });

  await user.save();

  const result = await api
    .post("/api/login")
    .send({ username: "admin", password: "admin" });

  USER_TOKEN = result.body.token;
  USER = jwt.verify(result.body.token, process.env.SECRET);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog({ ...helper.initialBlogs[0], user: USER.id });
  await blogObject.save();

  blogObject = new Blog({ ...helper.initialBlogs[1], user: USER.id });
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify the existence of the property id", async () => {
  const blogs = await api.get("/api/blogs").expect(200);

  expect(blogs.body[0].id).toBeDefined();
});

describe("when user is added", () => {
  test("will fail if credentials are missing", async () => {
    const wrongUser = {
      name: "admin da silva",
      password: "123456",
    };

    const result = await api.post("/api/users").send(wrongUser).expect(401);

    expect(result.body.error).toContain("username or password missing");
  });

  test("will fail if login credentials have length less then 3", async () => {
    const wrongUser = {
      username: "a",
      name: "Admin da silva",
      password: "as",
    };

    const result = await api.post("/api/users").send(wrongUser).expect(401);

    expect(result.body.error).toContain(
      "username and password should be at least three characters long"
    );
  });
});

describe("When blog is added", () => {
  test("http post creates a new blog post", async () => {
    let newBlog = {
      title: "Test3",
      author: "Erick oliveira",
      url: "ccc.com.br",
      likes: 0,
      userId: USER.id,
    };
    await api
      .post("/api/blogs/")
      .set("Authorization", `bearer ${USER_TOKEN}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.getBlogs();
    expect(blogs.length).toBe(helper.initialBlogs.length + 1);

    const titles = blogs.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test("post without authorization header will fail", async () => {
    let newBlog = {
      title: "Test3",
      author: "Erick oliveira",
      url: "ccc.com.br",
      likes: 0,
      userId: USER.id,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("post request without likes property will be set to zero", async () => {
    let newBlog = {
      title: "Test3",
      author: "Erick oliveira",
      url: "ccc.com.br",
    };
    await api
      .post("/api/blogs/")
      .set("Authorization", `bearer ${USER_TOKEN}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.getBlogs();
    expect(blogs[blogs.length - 1].likes).toBeDefined();
  });

  test("post request without title or url will not be added", async () => {
    let newBlog = {
      title: "Test3",
      author: "Erick oliveira",
      likes: 0,
    };
    await api
      .post("/api/blogs/")
      .set("Authorization", `bearer ${USER_TOKEN}`)
      .send(newBlog)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
