// const Questionnaire = require("../models/questionnaire");
// const Admin = require("../models/admin");
const mongoose = require("mongoose");

const healthcheck = async (req, res) => {
    try {
        const status = mongoose.connection.readyState;
        const connection_string =
            "mongodb+srv://SoftEng22-44:kgI1Hn1NaqTrGUDl@intelliqdatabase.at9uftu.mongodb.net/?retryWrites=true&w=majority";
        if (status != 1) {
            res.status(200).json({
                status: "failed",
                dbconnection: [connection_string],
            });
        }
        res.status(200).json({
            status: "OK",
            dbconnection: [connection_string],
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ msg: error });
    }
};

const upload_questionnaire = async (req, res) => {
    try {
        res.sendFile("upload_file.html", { root: "./views/" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

const resetall = async (req, res) => {};

const resetq = async (req, res) => {};

const usermod = async (req, res) => {};

const users = async (req, res) => {};

module.exports = {
    healthcheck,
    upload_questionnaire,
    resetall,
    resetq,
    usermod,
    users,
};
