const mongoose = require("mongoose");
const QuestionnaireSchema = require("../models/questionnaire");
const AdminSchema = require("../models/admin");
const json2csv = require("json2csv").parse;

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
        var admin_id = req.user._id;
        var admin = await AdminSchema.findOne({ _id: admin_id });

        if (admin) {
            if (admin.username === "SuperAdmin") {
                await QuestionnaireSchema.deleteMany({});
            } else {
                for (var i in admin.history) {
                    const questionnaire_id = admin.history[i];
                    await QuestionnaireSchema.deleteOne({
                        questionnaireID: questionnaire_id,
                    });
                }
            }
        }
        res.status(200).json({ status: "OK" });
    } catch (error) {
        res.status(500).json({ status: "failed", reason: error });
    }
};

const resetq = async (req, res) => {
    try {
        const admin_id = req.user._id;
        const admin = await AdminSchema.findOne({ _id: admin_id });
        if (admin) {
            const { questionnaireID } = req.params;
            const questionnaire = await QuestionnaireSchema.findOne({
                questionnaireID: questionnaireID,
            });

            var q;
            if (
                admin.history.includes(questionnaireID) ||
                admin.username === "SuperAdmin"
            ) {
                q = await QuestionnaireSchema.findOneAndUpdate(
                    { questionnaireID: questionnaireID },
                    { sessions: [] }
                );
            }

            if (!q) {
                res.status(400).json({ msg: "Bad Request" });
            } else {
                res.status(200).json({ status: "OK" });
            }
        }
    } catch (error) {
        console.log(error);
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
