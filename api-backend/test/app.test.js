const chai = require("chai");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const request = require("request");

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpPost(theUrl, sent) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.send(sent);
    return xmlHttp.responseText;
}

function httpPostStatus(theUrl, sent) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.send(sent);
    return xmlHttp.status;
}

function httpPostUpload(theUrl, source) {
    var req = request.post(baseURL + theUrl, function (err, resp, body) {});

    const data = fs.readFileSync(source);
    var form = req.form();
    form.append("uploaded_file", data, {
        filename: "uploaded_file.txt",
        contentType: "multipart/form_data",
    });
    return "Success!";
}

const baseURL = "http://localhost:9103/intelliq_api";

describe("GET questionnaire", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/questionnaire/QQ000");

        chai.expect(JSON.parse(response)).to.have.property("questionnaireID");
        chai.expect(JSON.parse(response)).to.have.property(
            "questionnaireTitle"
        );
        chai.expect(JSON.parse(response)).to.have.property("questions");
        chai.expect(JSON.parse(response).questions).to.be.an("array").that.is
            .not.empty;
    });
});

describe("healthcheck", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/admin/healthcheck");

        chai.expect(JSON.parse(response)).to.have.property("status");
        chai.expect(JSON.parse(response).status).to.equal("OK");
    });
});

describe("GET question", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/question/QQ000/Q01");

        chai.expect(JSON.parse(response)).to.have.property("qID");
        chai.expect(JSON.parse(response)).to.have.property("qtext");
        chai.expect(JSON.parse(response)).to.have.property("options");
        chai.expect(JSON.parse(response).options).to.have.be.an("array").that.is
            .not.empty;
    });
});

describe("GET sessionanswers", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/getsessionanswers/QQ000/SS000");

        chai.expect(JSON.parse(response).answers).to.be.an("array").that.is.not
            .empty;
    });
});

describe("GET questionanswers", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/getquestionanswers/QQ000/Q01");

        chai.expect(JSON.parse(response).answers).to.be.an("array").that.is.not
            .empty;
    });
});

describe("doanswer", () => {
    it("should print the correct output", async () => {
        var response = httpPostStatus("/doanswer/QQ000/Q06/SS000/Q06A1");

        chai.expect(response).to.equal(200);
    });
});

describe("questionnaire upload", () => {
    it("should print the correct output", async () => {
        var response = httpPostUpload(
            "/admin/questionnaire_upd",
            "./example.json"
        );

        chai.expect(response).to.equal("Success!");
    });
});

// describe("reset q", () => {
//     it("should print the correct output", async () => {
//         var response = httpPost("/admin/resetq/QQ000");
//         chai.expect(JSON.parse(response)).to.have.property("status");
//         chai.expect(JSON.parse(response).status).to.equal("OK");
//     });
// });

// describe("reset all", () => {
//     it("should print the correct output", async () => {
//         var response = httpPost("/admin/resetall");
//         chai.expect(JSON.parse(response)).to.have.property("status");
//         chai.expect(JSON.parse(response).status).to.equal("OK");
//     });
// });
