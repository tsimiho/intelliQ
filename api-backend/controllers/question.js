const QuestionnaireSchema = require("../models/questionnaire");

const getQuestion = async (req, res) => {
    try {
        const { questionnaireID, questionID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            const { questions } = questionnaire;

            var question;
            for (const i in questions) {
                if (questions[i].qID == questionID) {
                    question = questions[i];
                    break;
                }
            }

            res.status(200).json({ question });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getQuestion,
};
