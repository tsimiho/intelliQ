const QuestionnaireSchema = require("../models/questionnaire");
const json2csv = require("json2csv").parse;

const getQuestion = async (req, res) => {
    try {
        var { questionnaireID, questionID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            var { questionnaireID, questions } = questionnaire;

            var question;
            for (var i in questions) {
                if (questions[i].qID == questionID) {
                    question = questions[i];
                    break;
                }
            }

            var { qID, qtext, required, type, options } = question;

            for (var i in options) {
                delete options[i]["_id"];
            }

            var result = {
                questionnaireID: questionnaireID,
                qID: qID,
                qtext: qtext,
                required: required,
                type: type,
                options: options,
            };

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
    getQuestion,
};
