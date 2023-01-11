const QuestionnaireSchema = require("../models/questionnaire");

// const getQuestionnaire = async (req, res) => {
//     try {
//         const { questionnaireID, questionID, session, optionID } = req.params;
//         const questionnaire = await Questionnaire.findOne({
//             _id: questionnaireID,
//             questions: { _id: questionID },
//             sessions: { _id: sessionID },
//         });
//         if (!questionnaire) {
//             res.status(400).json({ msg: "Bad request" });
//         }
//         res.status(200).json({ questionnaire });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

const postOptionID = async (req, res) => {
    try {
        const { questionnaireID, questionID, session, optionID } = req.params;
        const questionnaire = await QuestionnaireSchema.findOne({
            _id: questionnaireID,
        });

        const { sessions } = questionnaire;

        var ses_index;
        for (const i in sessions) {
            if (sessions[i].sessionID === session) {
                ses_index = i;
                break;
            }
        }

        const pair = { qID: questionID, optionID: optionID };
        questionnaire.sessions[ses_index].pairs.push(pair);

        delete questionnaire._id;

        const q = await QuestionnaireSchema.findOneAndUpdate(
            { _id: questionnaireID },
            questionnaire
            // {
            //     new: true,
            //     runValidators: true,
            // }
        );

        if (!q) {
            res.status(400).json({ msg: "Bad Request" });
        }

        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    postOptionID,
};
