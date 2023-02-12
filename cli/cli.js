#!/usr/bin/env node

const { program } = require("commander");
const http = require("http");
const fs = require("fs");
const request = require("request");
const util = require("util");

const baseURL = "http://localhost:9103/intelliq_api";

const http_request_get = (api) => {
    http.get(baseURL + api, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

const http_request_post = (api) => {
    request.post(baseURL + api).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

program.command("healthcheck").action((options) => {
    try {
        http_request_get("/admin/healthcheck");
    } catch (error) {
        console.log(error);
    }
});

program.command("resetall").action((options) => {
    try {
        http_request_post("/admin/resetall");
        console.log(JSON.stringify({ status: "OK" }));
    } catch (error) {
        console.log(error);
    }
});

program
    .command("questionnaire")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_get("/questionnaire/" + options.questionnaire_id);
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("resetq")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_post("/resetq/" + options.questionnaire_id);
            console.log(JSON.stringify({ status: "OK" }));
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("question")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--question_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_get(
                "/question/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("getsessionanswers")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--session_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_get(
                "/getsessionanswers/" +
                    options.questionnaire_id +
                    "/" +
                    options.session_id
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("getquestionanswers")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--question_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_get(
                "/getquestionanswers/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("doanswer")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--question_id <value>", "command test option")
    .requiredOption("--session_id <value>", "command test option")
    .requiredOption("--option_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_post(
                "/doanswer/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id +
                    "/" +
                    options.session_id +
                    "/" +
                    options.option_id
            );
            console.log("Success!");
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("questionnaire_upd")
    .requiredOption("--source <value>", "command test option")
    .action((options) => {
        try {
            var req = request.post(
                baseURL + "/admin/questionnaire_upd",
                function (err, resp, body) {
                    if (err) {
                        console.log("Error!");
                    } else {
                        console.log("Success!");
                    }
                }
            );

            const data = fs.readFileSync(options.source);
            var form = req.form();
            form.append("uploaded_file", data, {
                filename: "uploaded_file.txt",
                contentType: "multipart/form_data",
            });
        } catch (error) {
            console.log(error);
        }
    });

program.parse();

/*
login
logout
admin
*/
