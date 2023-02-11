const QuestionnaireSchema = require("../models/questionnaire");

const allquestionnaires = async (req, res) => {
    try {
        const questionnaires = await QuestionnaireSchema.find({});

        var result = [];

        for (const i in questionnaires) {
            const { questionnaireID, questionnaireTitle } = questionnaires[i];
            const pair = {
                questionnaireID: questionnaireID,
                questionnaireTitle: questionnaireTitle,
            };
            result.push(pair);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = { allquestionnaires };
