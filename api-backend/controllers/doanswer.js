const QuestionnaireSchema = require("../models/questionnaire");

const postOptionID = async (req, res) => {
    try {
        const { questionnaireID, questionID, session, optionID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            _id: questionnaireID,
        });

        const { sessions } = questionnaire;

        var ses_index;
        for (const i in sessions) {
            if (sessions[i].sessionID === session) {
                ses_index = i;
                break;
            }
        }

        if (!ses_index) {
            questionnaire.sessions.push({ sessionID: session, pairs: [] });
            ses_index = 0;
        }

        const pair = { qID: questionID, optionID: optionID };
        questionnaire.sessions[ses_index].pairs.push(pair);

        delete questionnaire._id;

        const q = await QuestionnaireSchema.findOneAndUpdate(
            { _id: questionnaireID },
            questionnaire
        );

        if (!q) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            res.status(200).json(q);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    postOptionID,
};
