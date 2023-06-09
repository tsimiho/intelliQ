const QuestionnaireSchema = require("../models/questionnaire");
const AdminSchema = require("../models/admin");

const allquestionnaires = async (req, res) => {
    try {
        const questionnaires = await QuestionnaireSchema.find({});

        var result = [];

        var admin_id = req.user._id;
        var admin = await AdminSchema.findOne({ _id: admin_id });

        var admin_history;
        var admin_username;

        if (admin) {
            admin_history = admin.history;
            admin_username = admin.username;
        }

        for (const i in questionnaires) {
            const { questionnaireID, questionnaireTitle } = questionnaires[i];
            const pair = {
                questionnaireID: questionnaireID,
                questionnaireTitle: questionnaireTitle,
            };
            if (
                admin_history.includes(questionnaireID) ||
                admin_username === "SuperAdmin"
            ) {
                result.push(pair);
            }
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = { allquestionnaires };
