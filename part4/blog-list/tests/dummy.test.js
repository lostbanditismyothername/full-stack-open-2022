const { dummy } = require("../utils/list_helper");

describe("returns 1", () => {
  test("dummy returns 1", () => {
    const blogs = [];
    const result = dummy(blogs);

    expect(result).toBe(1);
  });
});
