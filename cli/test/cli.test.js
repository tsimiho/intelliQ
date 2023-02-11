const chai = require("chai");
const cmd = require("../cmd");
const { EOL } = require("os");
const fs = require("fs");

const file = require("../../api-backend/example.json");

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
        const response = await cmd.execute("cli.js", [
            "questionnaire",
            "--questionnaire_id",
            "QQ000",
        ]);

        // removeKeys(response, "_id");
        console.log(response);
        // chai.expect(response).to.equal(
        //     JSON.stringify({ questionnaire: file }, null, 4)
        // );
    });
});
