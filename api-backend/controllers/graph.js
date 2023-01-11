const QuestionnaireSchema = require("../models/questionnaire");

const graph = async (req, res) => {
    try {
        const { questionnaireID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            _id: questionnaireID,
        });

        if (!questionnaire) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            const { sessions, questions } = questionnaire;

            var qnas = [];

            for (var k in questions) {
                const { _id: qid, options, qtext } = questions[k];

                var ops = [];
                for (var l in options) {
                    const { _id: oid, opttext } = options[l];
                    ops.push({ optID: oid, opttext: opttext, counter: 0 });
                }
                // var op = {};
                // for (var r = 0; r < ops.length; r++) {
                //     var middle = { ...op, ...ops[r] };
                //     op = middle;
                // }
                qnas.push({ questionID: qid, qtext: qtext, options: ops });
            }

            for (var i in sessions) {
                const { pairs } = sessions[i];
                for (var j in pairs) {
                    const { qID, optionID } = pairs[j];
                    for (var f = 0; f < qnas.length; f++) {
                        const { questionID, options } = qnas[f];
                        if (questionID == qID) {
                            for (var g in options) {
                                const { optID } = options[g];
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
