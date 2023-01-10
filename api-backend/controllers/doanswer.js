const OptionSchema = require("../models/questionnaire");
const ItemSchema = require("../models/user");

const getQuestionnaire = async (req, res) => {
  try {
    const { questionnaireID, questionID, session, optionID } = req.params;
    const questionnaire = await Questionnaire.findOne({
      _id: questionnaireID,
      questions: { _id: questionID },
      sessions: { _id: sessionID },
    });
    if (!questionnaire) {
      res.status(400).json({ msg: "Bad request" });
    }
    res.status(200).json({ questionnaire });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const postOptionID = async (req, res) => {
  try {
    const { questionnaireID, questionID, session, optionID } = req.params;
    const questionnaire = await Questionnaire.findOne({
      _id: questionnaireID,
      questions: { _id: questionID },
      sessions: { _id: sessionID },
    });
    const Option = async (req, res) => {
      try {
        const pair = { qID: questionID, optionID: optionID };
        const Id = await Questionnaire.findOneAndUpdate({
          _id: questionnaireID,
          questions: { _id: questionID },
          sessions: {
            _id: sessionID,
            pairs: { qID: questionID, optionID: optionID },
          },
        });
        // const question = await questionnaire.findOne({ questions: { _id: questionID } })

        // if (!question) {
        //     res.status(400).json({ msg: 'Bad request' })
        // }

        // res.status(200).json({ question })
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    };
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  postOptionID,
  getQuestionnaire,
};
