const QuestionnaireSchema = require("../models/questionnaire");

const fullquestionnaire = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            res.status(200).json(questionnaire);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    fullquestionnaire,
};
