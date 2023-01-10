const Questionnaire = require('../models/questionnaire')



const getQuestionnaire = async (req, res) => {
    try {
        const { questionnaireID } = req.params
        const questionnaire = await Questionnaire.findOne({ _id: "63bcbf1adce44419912a6e80" })
        if (!questionnaire) {
            res.status(400).json({ msg: 'Bad request' })
        }

        res.status(200).json({ questionnaire })
    } catch (error) {


        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getQuestionnaire
}