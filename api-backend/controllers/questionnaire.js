const Questionnaire = require("../models/questionnaire");

const getQuestionnaire = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await Questionnaire.findOne({
            _id: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            res.status(200).json({ questionnaire });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getQuestionnaire,
};
