const QuestionnaireSchema = require("../models/questionnaire");

const getSessionanswers = async (req, res) => {
    try {
        const { questionnaireID, session } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            _id: questionnaireID,
        });

        const { sessions } = questionnaire;

        // console.log(sessions);
        var ses;
        for (const i in sessions) {
            if (sessions[i].sessionID === session) {
                ses = sessions[i];
                break;
            }
        }

        const { pairs } = ses;

        var arr = [];

        for (const j in pairs) {
            const { qID, optionID } = pairs[j];
            const pair = { qID: qID, optionID: optionID };
            arr.push(pair);
        }

        function compare(a, b) {
            if (a.qID < b.qID) {
                return -1;
            }
            if (a.qID > b.qID) {
                return 1;
            }
            return 0;
        }

        arr.sort(compare);

        res.status(200).json({ arr });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getSessionanswers,
};
