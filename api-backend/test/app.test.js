const chai = require("chai");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const request = require("request");
const axios = require("axios");

const baseURL = "http://localhost:9103/intelliq_api";
const jwt =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ViOTAxMTZjY2NmNjdhZjQ3MjFmMDMiLCJpYXQiOjE2NzY1OTY2MDUyNTIsImV4cCI6MTY3NjU5NzQ2OTI1Mn0.EpjFx_0pa05OI4AtsiIq_x21ylvEaLgs775zZWvdxPwBofsTVgRFve3_3fxCb6SYS6DRbXEIQPwg9tR4fym0Ye21OBgTDveZ0erxx6KpDqaz4oEbmyTDIkA_2LM-hGmTT6Q9Xbn-n9JBbGEJnrzBSdECEC_V5fkzwL6RcqGGwHky55bVAjuiU3EcV5d-w6Bg8TEI3WHkccL-swxsaJwNhYvg8yJyAnC8vgukZtZ_LEC70DLO-UD1VYwdX77gGrloE9PQpvKFvALFyOfLVxbTwineb3-j12zfiNolwUuiGPFObe0qBXVjsM-xnq6ovf3iOHl82FicWr6k7PyiCu1VtfKe8C6Pdd9Imh-BDc-lqZnbxPiekWs92fpa3NM43XBmztNlBO3hQm91fjZ-2Qb1zyyFiibKwephwJ-jNZ5IcgvCCGqkCm0CdSfFmOKmOghsfm8an2t0Gz22tD5VJdaJQTZi5TSVFEPFof5owooVYnUJRMH7Rd4kmF-1sxuigX9dlfv2UAf8bw0pAMs4b1Dx1hqPIGQSuX9rHnkE7L_wzsoxTZcXvyJ0KmpgmZS2t32bNLEa1NoFyyyQAonub7VpvC64EhOs-HXjOWDxPr7ctpygyR7LV7eQDkKdRO9MGWu33Tg_IfpiZRo1MNuW85o5Ac7cxLwVwiGjfx68oec-xN0";

(function () {
    var token;
    if (fs.existsSync("jwt")) {
        token = fs.readFileSync("jwt");
    }
    if (token) {
        axios.defaults.headers.common["X-OBSERVATORY-AUTH"] = token;
    } else {
        axios.defaults.headers.common["X-OBSERVATORY-AUTH"] = null;
    }
})();

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("X-OBSERVATORY-AUTH", jwt);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpPost(theUrl, sent) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("X-OBSERVATORY-AUTH", jwt);
    xmlHttp.send(sent);
    return xmlHttp.responseText;
}

function httpPostStatus(theUrl, sent) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", baseURL + theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("X-OBSERVATORY-AUTH", jwt);
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
        var response = httpGet("/getsessionanswers/QQ002/SS000");

        chai.expect(JSON.parse(response).answers).to.be.an("array");
    });
});

describe("GET questionanswers", () => {
    it("should print the correct output", async () => {
        var response = httpGet("/getquestionanswers/QQ000/Q01");

        chai.expect(JSON.parse(response).answers).to.be.an("array");
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
            require("path").resolve(__dirname, "../..") + "/data/example.json"
        );

        chai.expect(response).to.equal("Success!");
    });
});

describe("reset q", () => {
    it("should print the correct output", async () => {
        var response = httpPost("/admin/resetq/QQ000");
        chai.expect(JSON.parse(response)).to.have.property("status");
        chai.expect(JSON.parse(response).status).to.equal("OK");
    });
});
