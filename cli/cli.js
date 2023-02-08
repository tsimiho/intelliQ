#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const { program } = require("commander");
const fetch = require("fetch");
const http = require("http");
const fs = require("fs");
const request = require("request");

const baseURL = "http://localhost:9103/intelliq_api";

const http_request_get = (api) => {
    http.get(baseURL + api, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            console.log(JSON.parse(data));
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
            http_request_get(
                "/doanswer/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id +
                    "/" +
                    options.session_id +
                    "/" +
                    options.option_id
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("questionnaire_upd")
    .requiredOption("--source <value>", "command test option")
    .action((options) => {
        try {
            const path = options.source;

            var fileData = fs.readFileSync(path, "utf8");

            console.log(fileData);
            request.post(
                {
                    url: baseURL + "/admin/questionnaire_upd",
                    headers: {
                        enctype: "multipart/form-data",
                    },
                    formData: fileData,
                },
                function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error("upload failed:", err);
                    }
                    console.log(
                        "Upload successful!  Server responded with:",
                        body
                    );
                }
            );
        } catch (error) {
            console.log(error);
        }
    });

program.parse();

/*
login
logout
questionnaire_upd
admin
*/
