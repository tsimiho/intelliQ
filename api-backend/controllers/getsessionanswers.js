const Questionnaire = require("../models/questionnaire");

const getSessionanswers = async (req, res) => {
  try {
    const { questionnaireID, sessionID } = req.params;
    const questionnaire = await Questionnaire.findOne({
      questionnaireID: { _id: questionnaireID },
    });
    const answers = await questionnaire.findOne({
      sessions: { _id: sessionID },
    });
    if (!questionnaire) {
      res.status(400).json({ msg: "Bad request" });
    }
    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getSessionanswers,
};
