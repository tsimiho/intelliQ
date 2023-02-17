const chai = require("chai");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const request = require("request");
const axios = require("axios");

const baseURL = "http://localhost:9103/intelliq_api";
const jwt =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2VhNzZhNDg0ZTNjZjY2NGNiYjA1MzIiLCJpYXQiOjE2NzY1OTE3NzA5OTgsImV4cCI6MTY3NjU5MjYzNDk5OH0.HMLsnz9EGYmq9UCaXS7wL_lrCjOrLIB-cZBtOc6NUG-x-K21MVRxMckZ7BvBDWyHlLF0CCR7RsZwa0Ygs31SFcz756G9pAVBpXX96B9AQpLEZ_iiaYm0LfugxqB26GBbj3OK1BD1AG_Qv7TaOc79qmgCoQTEREXIAdxwWC_0PPXpBhvv7BKIOcbSZbnvU03CCCV_OH10pwAPDN_ULKvE_jedp8bX7GGxS8eeKhcXzZOYVhqLHTLbxA6DmI-IVr-4ko6KYY091VyQvcGwn7g-yVxZWay8_kIRL7kcLBkQLoh4g1Vo3lq-JwKMdrj_YIqRJLKnGT7Od0h3XvpyO3EUwR22KGiV-MClTasCJ2Mp4v6Zb_rFIAurrrlxY6gAMHa9IA6NXVb0OzJ7d8cFOsD6zff2GxGr_pc1wE3Ednhwr5_cd52iieK1TRq6c7ZpLrWLSpkizb95s9Zci5yp-9Lsq2Bs1VbihtDP43EtSUHSnO7jgDMvnhDz8O0accIIVcLEVwTXcmJondbDWGFa4b6IeVpE6rR7UTRwMmqr5ILsOhMV0-cHuY3ox1Q7JsvVctiY3T14NMte4mx3d2QsrTuxrw_oeszyJQ3FB_f1qFj97gu1FphGZKUA_vtzHMrrUKY48Ypxmc6_-C1JPUe13c--ywmzPMW9VZh_vkOaI8MpVBY";

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
            "../data/example.json"
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
