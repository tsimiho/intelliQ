const QuestionnaireSchema = require("../models/questionnaire");
const json2csv = require("json2csv").parse;

const graph = async (req, res) => {
    try {
        var { questionnaireID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            var { sessions, questions } = questionnaire;

            var qnas = [];

            // var t = { counter: 0 };
            // qnas.push(t);

            for (var k in questions) {
                var { qID: qid, options, qtext } = questions[k];

                var ops = [];
                for (var l in options) {
                    var { optID: oid, opttxt } = options[l];
                    var c = 0;
                    ops.push({ optID: oid, opttxt: opttxt, counter: c });
                }
                // var op = {};
                // for (var r = 0; r < ops.length; r++) {
                //     var middle = { ...op, ...ops[r] };
                //     op = middle;
                // }
                qnas.push({ qID: qid, qtext: qtext, options: ops });
            }

            for (var i in sessions) {
                var { pairs } = sessions[i];
                for (var j in pairs) {
                    var { qID, optionID } = pairs[j];
                    for (var f = 0; f < qnas.length; f++) {
                        var { qID: questionID, options } = qnas[f];
                        if (questionID == qID) {
                            for (var g in options) {
                                var { optID } = options[g];
                                if (optID == optionID) {
                                    qnas[f].options[g].counter++;
                                }
                            }
                        }
                    }
                }
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
    graph,
};
