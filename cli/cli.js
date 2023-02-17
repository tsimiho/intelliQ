#!/usr/bin/env node

const { program } = require("commander");
const http = require("http");
const fs = require("fs");
const request = require("request");
const util = require("util");
const json2csv = require("json2csv").parse;
const axios = require("axios");

const baseURL = "http://localhost:9103/intelliq_api";

const login = (username, password) => {
    axios
        .post(baseURL + "/login", {
            username: username,
            password: password,
        })
        .then((req, res) => {
            if (fs.existsSync("../cli/jwt")) {
                fs.unlink("../cli/jwt", function (err) {
                    if (err) throw err;
                });
            }
            fs.writeFile("../cli/jwt", req.data.token, function (err) {
                if (err) throw err;
                console.log("Login Successful!");
            });
        })
        .catch((error) => {
            console.log("Wrong Credentials");
        });
};

(function () {
    var token;
    if (fs.existsSync("../cli/jwt")) {
        token = fs.readFileSync("../cli/jwt");
    }
    if (token) {
        axios.defaults.headers.common["X-OBSERVATORY-AUTH"] = token;
    } else {
        axios.defaults.headers.common["X-OBSERVATORY-AUTH"] = null;
    }
})();

const http_request_get = (api, format) => {
    axios
        .get(baseURL + api)
        .then((res) => {
            if (format === "json") {
                console.log(JSON.stringify(res.data, null, 2));
            } else if (format === "csv") {
                console.log(json2csv(res.data));
            } else {
                console.error("Unsupported format");
            }
        })
        .catch((err) => {
            console.log("Error: " + err.message);
        });
};

const http_request_post = (api) => {
    axios.post(baseURL + api).catch((error) => {
        console.log(error);
    });
};

program.command("healthcheck").action((options) => {
    try {
        http_request_get("/admin/healthcheck", "json");
    } catch (error) {
        console.log(error);
    }
});

program.command("resetall").action((options) => {
    try {
        http_request_post("/admin/resetall");
        console.log("ResetAll was successful!");
    } catch (error) {
        console.log(error);
    }
});

program
    .command("questionnaire")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--format <value>", "please provide format")
    .action((options) => {
        try {
            http_request_get(
                "/questionnaire/" + options.questionnaire_id,
                options.format
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("resetq")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .action((options) => {
        try {
            http_request_post("/admin/resetq/" + options.questionnaire_id);
            console.log("Reset Successful");
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("question")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--question_id <value>", "command test option")
    .requiredOption("--format <value>", "please provide format")
    .action((options) => {
        try {
            http_request_get(
                "/question/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id,
                options.format
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("getsessionanswers")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--session_id <value>", "command test option")
    .requiredOption("--format <value>", "please provide format")
    .action((options) => {
        try {
            http_request_get(
                "/getsessionanswers/" +
                    options.questionnaire_id +
                    "/" +
                    options.session_id,
                options.format
            );
        } catch (error) {
            console.log(error);
        }
    });

program
    .command("getquestionanswers")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .requiredOption("--question_id <value>", "command test option")
    .requiredOption("--format <value>", "please provide format")
    .action((options) => {
        try {
            http_request_get(
                "/getquestionanswers/" +
                    options.questionnaire_id +
                    "/" +
                    options.question_id,
                options.format
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

program
    .command("login")
    .requiredOption("--username <value>", "command test option")
    .requiredOption("--password <value>", "please provide format")
    .action((options) => {
        try {
            login(options.username, options.password);
        } catch (error) {
            console.log(error);
        }
    });

program.command("logout").action((options) => {
    try {
        axios.post(baseURL + "/logout").then((req, res) => {
            if ((req.status = 200)) {
                if (fs.existsSync("../cli/jwt")) {
                    fs.unlink("../cli/jwt", function (err) {
                        if (err) throw err;
                        console.log("Logout Successful!");
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
});

program
    .command("admin")
    .requiredOption("--usermod", "command test option")
    .requiredOption("--username <value>", "command test option")
    .requiredOption("--passw <value>", "please provide format")
    .action((options) => {
        try {
            axios
                .post(baseURL + "/register", {
                    username: options.username,
                    password: options.passw,
                })
                .catch((error) => {
                    console.log("You are not authorized");
                });
            // .then((req, res) => {
            //     if (req.status == 401) {
            //         console.log("You are not authorized");
            //     }
            // });
        } catch (error) {
            console.log("error");
        }
    });

program.parse();

/*
login
logout
admin
*/
