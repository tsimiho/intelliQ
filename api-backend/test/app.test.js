//const assert = require("chai").assert;
const app = require("../app");
const questionnaire = app.questionnaire;
const question = app.question;
const sessions = app.getsessionanswers;
const fs = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
const http = require("http");
const file = fs.readFileSync("./example.json", { encoding: "utf8" });

process.on("uncaughtException", function (err) {
  console.log(err);
});

describe("/GET/:questionnaireID", () => {
  it("it should GET a questionnaire with the given id", async (done) => {
    const data = await http.get(
      "http://localhost:9103/intelliq_api/questionnaire/QQ000"
    );
    chai.expect(data.body).is.eql(file);
    //   .request(app)
    //   .get("http://localhost:9103/intelliq_api/questionnaire/QQ000")
    //   .send(questionnaire)
    //   .end((err, res) => {
    //     res.body.should.have
    //       .property("questionnaireID")
    //       .eql(JSON(file.questionnaireID));
    //     res.should.have.status(200);
    //     res.body.should.have.property("_id").eql(questionnaire.questionnaireID);
    //   });
    done();
  });
});

// describe("/GET/:questionID", () => {
//   it("it should GET a question with the given id", (done) => {
//     // questionnaire.save((err, questionnaire) => {
//     chai
//       .request(app)
//       .get("/intelliq_api/question/QQ000/P00")
//       .send(question)
//       .end((err, res) => {
//         res.body.should.have.property("questionID").eql(JSON(file.qID));
//         res.should.have.status(200);
//         // res.body.should.have.property("_id").eql(questionnaire.questionnaireID);
//       });
//     done();
//   });
// });

// describe("/POST/:optionID", () => {
//   it("it should GET an option with the given id", (done) => {
//     // questionnaire.save((err, questionnaire) => {
//     chai
//       .request(app)
//       .post("/intelliq_api/doanswer/QQ000/Q01/SS000/Q01A3")
//       .send(sessions)
//       .end((err, res) => {
//         res.body.should.have.property("optionID").eql(JSON(file.optionID));
//         res.should.have.status(200);
//         // res.body.should.have.property("_id").eql(questionnaire.questionnaireID);
//       });
//     done();
//   });
// });

// describe("/GET/:session", () => {
//   it("it should GET the aswers of a session with the given id", (done) => {
//     // questionnaire.save((err, questionnaire) => {
//     chai
//       .request(app)
//       .get("/intelliq_api/getsessionanswers/QQ000/SS000")
//       .send(sessions)
//       .end((err, res) => {
//         res.body.should.have.property("sessionID").eql(JSON(file.sessionID));
//         res.should.have.status(200);
//         // res.body.should.have.property("_id").eql(questionnaire.questionnaireID);
//       });
//     done();
//   });
// });

//http://localhost:9103/intelliq_api
