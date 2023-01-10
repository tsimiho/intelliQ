const Questionnaire = require('../models/questionnaire')


const getQuestionnaire = async (req, res) => {
    try {
        const { questionnaireID, questionID } = req.params
        const questionnaire = await Questionnaire.findOne({ _id: questionnaireID })
        if (!questionnaire) {
            res.status(400).json({ msg: 'Bad request' })
        }

        const question = await questionnaire.questions.findOne({ _id: questionID})

        if (!question) {
            res.status(400).json({ msg: 'Bad request' })
        }

        res.status(200).json({ questionnaire })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = {
    getQuestionnaire
}