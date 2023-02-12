let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
const request = require("supertest");
const { deleteOne } = require("../models/questionnaire");
const questionnaire = require("../routes/questionnaire");
const { getQuestionnaire } = require("../controllers/questionnaire");
// //Assertion Style
chai.should();

chai.use(chaiHttp);

chai.request("http://localhost:9103").get("/");

describe("GET /api/tasks/:id", () => {
  it("It should GET a task by ID", (done) => {
    const questionnaireID = "QQ000";
    chai
      .request(server)
      .get("/intelliq_api/questionnaire/" + questionnaireID)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        // response.body.should.have.property("id");
        // response.body.should.have.property("name");
        // response.body.should.have.property("completed");
        // response.body.should.have.property("id").eq(1);
        done();
      });
    done();
  });
});

//     // it("It should NOT GET all the tasks", (done) => {
//     //   chai
//     //     .request(server)
//     //     .get("/intelliq_api/question/QQ000/Q09")
//     //     .end((err, response) => {
//     //       response.should.have.status(404);
//     //       done();
//     //     });
//     //   done();

//http://localhost:9103/intelliq_api
