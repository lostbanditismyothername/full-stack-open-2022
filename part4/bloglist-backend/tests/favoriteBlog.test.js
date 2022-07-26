const { favoriteBlog } = require("../utils/list_helper");
const helper = require("./test_helper");

describe("favorite blog", () => {
  const favBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  };

  test("the data of fav blog", () => {
    expect(favoriteBlog(helper.blogs)).toEqual(favBlog);
  });
});
