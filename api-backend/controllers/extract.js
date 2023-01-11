const QuestionnaireSchema = require("../models/questionnaire");
const { parse } = require("json2csv");

const extract_json = async (req, res) => {
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

            var filename = `${questionnaireID}.json`;
            var mimetype = "application/json";
            res.setHeader("Content-Type", mimetype);
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + filename
            );

            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const extract_csv = async (req, res) => {
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

            const csv = parse(result);

            var filename = `${questionnaireID}.csv`;
            var mimetype = "application/json";
            res.setHeader("Content-Type", mimetype);
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + filename
            );

            res.status(200).send(csv);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    extract_json,
    extract_csv,
};
