const QuestionnaireSchema = require("../models/questionnaire");

const summary = async (req, res) => {
    try {
        var { questionnaireID, sessionID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });
        if (!questionnaire) {
            res.status(400).json({ msg: "Bad request" });
        } else {
            var { questionnaireID, questions, sessions } = questionnaire;

            var session = {};
            for (var i in sessions) {
                if (sessions[i].sessionID == sessionID) {
                    session = sessions[i];
                    break;
                }
            }

            var session_text = { sessionID: session.sessionID, pairs: [] };

            for (var i in session.pairs) {
                var pair = session.pairs[i];
                for (var j in questions) {
                    if (questions[j].qID == pair.qID) {
                        for (var k in questions[j].options) {
                            if (
                                questions[j].options[k].optID == pair.optionID
                            ) {
                                session_text.pairs.push({
                                    qtext: questions[j].qtext,
                                    opttxt: questions[j].options[k].opttxt,
                                });
                            } else if (questions[j].options.length == 1) {
                                session_text.pairs.push({
                                    qtext: questions[j].qtext,
                                    opttxt: pair.optionID,
                                });
                            }
                        }
                    }
                }
            }

            if (JSON.stringify(session_text) === "{}") {
                res.status(402).json({ error: "No data" });
            } else {
                res.status(200).json(session_text);
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    summary,
};
