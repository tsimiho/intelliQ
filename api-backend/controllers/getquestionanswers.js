const Questionnaire = require("../models/questionnaire");

const getQuestionanswers = async (req, res) => {
  try {
    const { questionnaireID, questionID } = req.params;
    const questionnaire = await Questionnaire.findOne({ _id: questionnaireID });
    const { sessions } = questionnaire;
    let array = [];
    for (const i in sessions) {
      const { pairs } = i;
      const option = await pairs.findone({ questionID: qID });
      if (option) {
        const { optionID } = option;
        if (optionID != "empty") {
          array.push(optionID);
        }
      }
    }
    if (!questionnaire) {
      res.status(400).json({ msg: "Bad request" });
    }
    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getQuestionanswers,
};
