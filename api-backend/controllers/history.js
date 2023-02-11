const QuestionnaireSchema = require("../models/questionnaire");

const history = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            const { questions, sessions } = questionnaire;

            var result = [];
            for (var i in sessions) {
                const { sessionID, pairs } = sessions[i];
                var obj = { sessionID: sessionID, pair: [] };
                for (var j in pairs) {
                    const { qID, optID } = pairs[j];

                    const op = optID;

                    for (var k in questions) {
                        const { qID: qi, options, qtext } = questions[k];
                        if (qi == qID) {
                            for (var l in options) {
                                const { optID, opttxt } = options[l];

                                if (optID == op) {
                                    const p = {
                                        qtext: qtext,
                                        opttxt: opttext,
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

            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    history,
};
