const QuestionnaireSchema = require("../models/questionnaire");

const graph = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            var { sessions, questions } = questionnaire;

            var qnas = [];

            for (var k in questions) {
                var { qID: qid, options, qtext } = questions[k];

                var ops = [];
                for (var l in options) {
                    var { optID: oid, opttext } = options[l];
                    ops.push({ optID: oid, opttxt: opttext, counter: 0 });
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
                    var { qID, optID: optionID } = pairs[j];
                    for (var f = 0; f < qnas.length; f++) {
                        var { questionID, options } = qnas[f];
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

            res.status(200).json(qnas);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    graph,
};
