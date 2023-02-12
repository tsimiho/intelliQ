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

            var ses_index;
            for (const i in sessions) {
                if (sessions[i].sessionID === session) {
                    ses_index = i;
                    break;
                }
            }

            if (!ses_index) {
                questionnaire.sessions.push({ sessionID: session, pairs: [] });
                ses_index = questionnaire.sessions.length;
            }

            var pair = { qID: questionID, optionID: optionID };

            var check = false;
            for (const i in questionnaire.sessions[ses_index].pairs) {
                if (
                    (questionnaire.sessions[ses_index].pairs[i].qID =
                        questionID)
                ) {
                    questionnaire.sessions[ses_index].pairs[i].optionID =
                        optionID;
                    check = true;
                    break;
                }
            }
            
            if (!check) {
                questionnaire.sessions[ses_index].pairs.push(pair);
            }

            questionnaire.questionnaireID = questionnaireID;

            var q = await QuestionnaireSchema.findOneAndUpdate(questionnaire);

            if (!q) {
                res.status(400).json({ msg: "Bad Request" });
            } else {
                res.status(200).json(q);
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
