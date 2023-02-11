const QuestionnaireSchema = require("../models/questionnaire");

const getQuestionnaire = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            const { questionnaireID, questionnaireTitle, keywords, questions } =
                questionnaire;

            // const { qID, qtext, required, type } = questions;

            const result = {
                questionnaireID: questionnaireID,
                questionnaireTitle: questionnaireTitle,
                keywords: keywords,
                questions: questions,
            };

            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getQuestionnaire,
};
