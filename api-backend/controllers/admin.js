const mongoose = require("mongoose");
const QuestionnaireSchema = require("../models/questionnaire");
const UserSchema = require("../models/user");

const healthcheck = async (req, res) => {
    try {
        console.log(req.query.format);
        const status = mongoose.connection.readyState;
        const connection_string =
            "mongodb+srv://SoftEng22-44:kgI1Hn1NaqTrGUDl@intelliqdatabase.at9uftu.mongodb.net/?retryWrites=true&w=majority";
        if (status != 1) {
            res.status(200).json({
                status: "failed",
                dbconnection: [connection_string],
            });
        } else {
            res.status(200).json({
                status: "OK",
                dbconnection: [connection_string],
            });
        }
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

const resetall = async (req, res) => {
    try {
        await QuestionnaireSchema.deleteMany({});
        await UserSchema.deleteMany({});

        res.status(200).json({ status: "OK" });
    } catch (error) {
        res.status(500).json({ status: "failed", reason: error });
    }
};

const resetq = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        questionnaire.sessions = [];

        var q = await QuestionnaireSchema.findOneAndUpdate(questionnaire);

        if (!q) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            res.status(200).json({ status: "OK" });
        }
    } catch (error) {
        res.status(500).json({ status: "failed", reason: error });
    }
};

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
