const QuestionnaireSchema = require("../models/questionnaire");
const json2csv = require("json2csv").parse;

const history = async (req, res) => {
    try {
        var { questionnaireID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            var { questions, sessions } = questionnaire;

            var result = [];
            for (var i in sessions) {
                var { sessionID, pairs } = sessions[i];
                var obj = { sessionID: sessionID, pair: [] };
                for (var j in pairs) {
                    var { qID, optionID } = pairs[j];

                    var op = optionID;

                    for (var k in questions) {
                        var { qID: qi, options, qtext } = questions[k];
                        if (qi == qID) {
                            for (var l in options) {
                                var { optID, opttxt } = options[l];
                                if (optID == op) {
                                    var p = {
                                        qtext: qtext,
                                        opttxt: opttxt,
                                    };
                                    obj.pair.push(p);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                result.push(obj);
            }

            if (req.query && req.query.format === "csv") {
                res.status(200).send(json2csv(qnas));
            } else {
                res.status(200).json(qnas);
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    history,
};
