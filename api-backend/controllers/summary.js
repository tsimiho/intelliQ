const QuestionnaireSchema = require("../models/questionnaire");

const summary = async (req, res) => {
    try {
        var { questionnaireID, sessionID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            var { questionnaireID, sessions } = questionnaire;

            var ses = {};
            for (var i in sessions) {
                if (sessions[i].sessionID == sessionID) {
                    ses = sessions[i];
                    break;
                }
            }

            res.status(200).json(ses);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    summary,
};
