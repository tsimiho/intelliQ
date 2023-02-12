const chai = require("chai");
const cmd = require("./cmd");
const { EOL } = require("os");
const fs = require("fs");

var file = require("../../api-backend/example.json");

function removeKeys(obj, keys) {
    var index;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof obj[prop]) {
                case "string":
                    index = keys.indexOf(prop);
                    if (index > -1) {
                        delete obj[prop];
                    }
                    break;
                case "object":
                    index = keys.indexOf(prop);
                    if (index > -1) {
                        delete obj[prop];
                    } else {
                        removeKeys(obj[prop], keys);
                    }
                    break;
            }
        }
    }
}

describe("GET questionnaire", () => {
    it("should print the correct output", async () => {
        var response = await cmd.execute("cli.js", [
            "questionnaire",
            "--questionnaire_id",
            "QQ000",
        ]);
        var parsed = JSON.parse(response);

        delete file["sessions"];

        for (const i in file.questions) {
            delete file.questions[i]["options"];
        }

        chai.expect(JSON.stringify(parsed)).to.equal(JSON.stringify(file));
    });
});

describe("questionnaire upload", () => {
    it("should print success", async () => {
        var response = await cmd.execute("cli.js", [
            "questionnaire_upd",
            "--source",
            "../api-backend/example.json",
        ]);

        chai.expect(response).to.equal("Success!\n");
    });
});

describe("reset questionnaire", () => {
    it("should print { status: 'OK' }", async () => {
        var response = await cmd.execute("cli.js", [
            "resetq",
            "--questionnaire_id",
            "QQ005",
        ]);

        chai.expect(JSON.parse(response).status).to.equal("OK");
    });
});

describe("GET question", () => {
    it("should print the correct output", async () => {
        var response = await cmd.execute("cli.js", [
            "question",
            "--questionnaire_id",
            "QQ000",
            "--question_id",
            "Q01",
        ]);

        var parsed = JSON.parse(response).qtext;
        console.log(parsed);

        const q = file.questions[2].qtext;

        chai.expect(JSON.stringify(parsed)).to.equal(JSON.stringify(q));
    });
});

describe("doanswer", () => {
    it("should print the correct output", async () => {
        var response = await cmd.execute("cli.js", [
            "doanswer",
            "--questionnaire_id",
            "QQ004",
            "--question_id",
            "Q06",
            "--session_id",
            "SS000",
            "--option_id",
            "Q06A1",
        ]);

        chai.expect(response).to.equal("Success!\n");
    });
});

describe("getsessionanswers", () => {
    it("should print the correct output", async () => {
        var response = await cmd.execute("cli.js", [
            "getsessionanswers",
            "--questionnaire_id",
            "QQ004",
            "--session_id",
            "SS000",
        ]);

        chai.expect(JSON.parse(response).answers).to.be.an("array").that.is.not
            .empty;
    });
});

describe("getquestionanswers", () => {
    it("should print the correct output", async () => {
        var response = await cmd.execute("cli.js", [
            "getquestionanswers",
            "--questionnaire_id",
            "QQ004",
            "--question_id",
            "Q01",
        ]);

        chai.expect(JSON.parse(response).answers).to.be.an("array").that.is.not
            .empty;
    });
});
