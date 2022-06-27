const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

// Initialize test DB
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

describe("Endpoints", () => {
  test("notes are returned in correct number", async () => {
    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(helper.blogs.length);
  });

  test("post", async () => {
    const newBlog = {
      title: "some title",
      author: "Poe",
      url: "unknown.com",
      likes: 100,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(helper.blogs.length + 1);

    const authors = await response.body.map((blog) => blog.author);
    expect(authors).toContain("Poe");
  });

  test("delete", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

    const authors = blogsAtEnd.map((b) => b.author);

    expect(authors).not.toContain(blogToDelete.author);
  });
});

// Close connection
afterAll(() => {
  mongoose.connection.close();
});
