//const assert = require("chai").assert;
const app = require("../app");
const questionnaire = app.questionnaire;
const fs = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

const file = fs.readFileSync("./example.json", { encoding: "utf8" });

describe("/GET/:questionnaireID", () => {
  it("it should GET a questionnaire with the given id", (done) => {
    // questionnaire.save((err, questionnaire) => {
    chai
      .request(app)
      .get("/intelliq_api/questionnaire/QQ000")
      .send(questionnaire)
      .end((err, res) => {
        res.body.should.have
          .property("questionnaireID")
          .eql(JSON(file.questionnaireID));
        res.should.have.status(200);
        // res.body.should.have.property("_id").eql(questionnaire.questionnaireID);
      });
    done();
  });
});

//http://localhost:9103/intelliq_api
