const QuestionnaireSchema = require("../models/questionnaire");

const history = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            _id: questionnaireID,
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
                    const { qID, optionID } = pairs[j];

                    const op = optionID;

                    for (var k in questions) {
                        const { _id, options, qtext } = questions[k];
                        if (_id == qID) {
                            for (var l in options) {
                                const { _id, opttext } = options[l];

                                if (_id == op) {
                                    const p = {
                                        qtext: qtext,
                                        opttext: opttext,
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
