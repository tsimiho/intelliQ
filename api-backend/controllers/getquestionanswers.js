const QuestionnaireSchema = require("../models/questionnaire");

const getquestionanswers = async (req, res) => {
    try {
        const { questionnaireID, questionID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            const { sessions } = questionnaire;
            let array = [];
            for (const i in sessions) {
                const { sessionID, pairs } = sessions[i];
                for (const j in pairs) {
                    const { qID, optionID } = pairs[j];
                    if (qID === questionID) {
                        array.push({ session: sessionID, optionID: optionID });
                        break;
                    }
                }
            }

            res.status(200).json({ array });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getquestionanswers,
};
