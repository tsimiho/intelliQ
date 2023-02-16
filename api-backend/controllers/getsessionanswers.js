const QuestionnaireSchema = require("../models/questionnaire");
const json2csv = require("json2csv").parse;

const getSessionanswers = async (req, res) => {
    try {
        const { questionnaireID, session } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
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

        const { sessionID, pairs } = ses;

        var arr = [];

        for (const j in pairs) {
            const { qID, optionID } = pairs[j];
            const pair = { qID: qID, ans: optionID };
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

        const result = {
            questionnaireID: questionnaireID,
            session: sessionID,
            answers: arr,
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
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getSessionanswers,
};
