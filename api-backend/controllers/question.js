const { QuestionnaireSchema } = require("../models/questionnaire");

const getQuestionnaire = async (req, res) => {
  try {
    const { questionnaireID, questionID } = req.params;
    const question = await QuestionnaireSchema.find({ _id: questionnaireID });
    if (!question) {
      res.status(400).json({ msg: "Bad request" });
    }

    //question = await questionnaire.findOne({ questions: { _id: questionID } })

    if (!question) {
      res.status(400).json({ msg: "Bad request" });
    }

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getQuestionnaire,
};
