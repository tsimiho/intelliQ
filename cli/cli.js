#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const { program } = require("commander");
const fetch = require("fetch");
const http = require("http");

const baseURL = "http://localhost:9103/intelliq_api";

const http_request = (api) => {
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

program.command("healthcheck").action((options) => {
    try {
        http_request("/admin/healthcheck");
    } catch (error) {
        console.log(error);
    }
});

program.command("healthcheck").action((options) => {
    try {
        http_request("/admin/resetall");
    } catch (error) {
        console.log(error);
    }
});

program
    .command("questionnaire")
    .requiredOption("--questionnaire_id <value>", "command test option")
    .action((options) => {
        http_request("/questionnaire/" + options.questionnaire_id);
    });

program.parse();
