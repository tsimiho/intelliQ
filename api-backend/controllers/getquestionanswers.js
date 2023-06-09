const QuestionnaireSchema = require("../models/questionnaire");
const json2csv = require("json2csv").parse;

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
                        array.push({ session: sessionID, ans: optionID });
                        break;
                    }
                }
            }
            const result = {
                questionnaireID: questionnaireID,
                questionID: questionID,
                answers: array,
            };

            if (JSON.stringify(result) === "{}") {
                res.status(402).json({ error: "No data" });
            } else {
                if (req.query && req.query.format === "csv") {
                    res.status(200).send(json2csv(result));
                } else {
                    res.status(200).json(result);
                }
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getquestionanswers,
};
