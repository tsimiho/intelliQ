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
            const { questionnaireID, questions } = questionnaire;

            var question;
            for (const i in questions) {
                if (questions[i].qID == questionID) {
                    question = questions[i];
                    break;
                }
            }

            const { qID, qtext, required, type, options } = question;

            for (const i in options) {
                delete options[i]["_id"];
            }

            const result = {
                questionnaireID: questionnaireID,
                qID: qID,
                qtext: qtext,
                required: required,
                type: type,
                options: options,
            };

            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getQuestion,
};
