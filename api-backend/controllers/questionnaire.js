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

            var qs = [];
            for (const i in questions) {
                const { qID, qtext, required, type } = questions[i];
                const q = {
                    qID: qID,
                    qtext: qtext,
                    required: required,
                    type: type,
                };
                qs.push(q);
            }

            const result = {
                questionnaireID: questionnaireID,
                questionnaireTitle: questionnaireTitle,
                keywords: keywords,
                questions: qs,
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
