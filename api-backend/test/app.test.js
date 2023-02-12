const supertest = require("supertest");
const app = require("../app");
//const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("given the product does exist", () => {
  it("should return a 200 status and the product", async (done) => {
    // @ts-ignore

    const questionnaireID = "QQ000";
    const { body, statusCode } = await supertest(app).get(
      `/intelliq_api/healthcheck`
    );

    expect(statusCode).toBe(200);

    expect(body.questionnaireID).toBe(questionnaireID);
    done();
  });
});

// const request = require("supertest");
// const app = require("../app");

// describe("get Endpoints", () => {
//   // it("should create a new post", async () => {
//   //   const res = await request(app).post("/api/posts").send({
//   //     userId: 1,
//   //     title: "test is cool",
//   //     content: "Lorem ipsum",
//   //   });
//   //   expect(res.statusCode).toEqual(201);
//   //   expect(res.body).toHaveProperty("post");
//   // });

//   it("should get a single post", async (done) => {
//     const questionnaireID = "QQ000";
//     const res = await request(app).get(
//       `/intelliq_api/questionnaire/${questionnaireID}`
//     );
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("questionnaireTitle");
//     done();
//   });
//   // it("should fetch all posts", async () => {
//   //   const res = await request(app).get("/api/posts");
//   //   expect(res.statusCode).toEqual(200);
//   //   expect(res.body).toHaveProperty("posts");
//   //   expect(res.body.posts).toHaveLength(1);
//   // });

//   // it("should update a post", async () => {
//   //   const res = await request(app).put("/api/posts/1").send({
//   //     userId: 1,
//   //     title: "updated title",
//   //     content: "Lorem ipsum",
//   //   });

//   //   expect(res.statusCode).toEqual(200);
//   //  / expect(res.body).toHaveProperty("post");
//   //   expect(res.body.post).toHaveProperty("title", "updated title");
// });
