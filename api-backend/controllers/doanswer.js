const { boolean } = require("yargs");
const QuestionnaireSchema = require("../models/questionnaire");

const postOptionID = async (req, res) => {
    try {
        var { questionnaireID, questionID, session, optionID } = req.params;
        var questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: questionnaireID,
        });

        if (questionnaire) {
            var { sessions } = questionnaire;

            var ses_index = -1;
            for (const i in sessions) {
                if (sessions[i].sessionID === session) {
                    ses_index = i;
                    break;
                }
            }

            if (ses_index == -1) {
                sessions.push({ sessionID: session, pairs: [] });
            }

            for (const i in sessions) {
                if (sessions[i].sessionID === session) {
                    ses_index = i;
                    break;
                }
            }
            // console.log(ses_index);

            if (optionID === "TXT") {
                optionID = req.body.answer;
            }

            var pair = { qID: questionID, optionID: optionID };

            var check = false;
            if (sessions[ses_index].pairs.length > 0) {
                for (const i in sessions[ses_index].pairs) {
                    if (sessions[ses_index].pairs[i].qID == questionID) {
                        sessions[ses_index].pairs[i].optionID = optionID;
                        check = true;
                        break;
                    }
                }
            }
            if (!check) {
                sessions[ses_index].pairs.push(pair);
            }

            // questionnaire.questionnaireID = questionnaireID;

            var q = await QuestionnaireSchema.findOneAndUpdate(
                { questionnaireID: questionnaireID },
                { sessions: sessions }
            );

            var newq = await QuestionnaireSchema.findOne({
                questionnaireID: questionnaireID,
            });

            if (!q) {
                res.status(400).json({ msg: "Bad Request" });
            } else {
                res.status(200).json(newq);
            }
        } else {
            res.status(400).json({ msg: "Bad Request" });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    postOptionID,
};
