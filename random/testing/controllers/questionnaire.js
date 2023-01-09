const Questionnaire = require('../models/questionnaire')



const getTask = asyncWrapper(async (req, res, next) => {
    try {
        const { id: questionnaireID } = req.params
        const questionnaire = await Questionnaire.findOne({ _id: questionnaireID })
        if(!questionnaire) {
            res.status(400).json({ msg: 'Bad request'})
        }

        res.status(200).json({ task })
    } catch(error) {
        res.status(500).json({ msg: 'Internal server error'})
    }
    
  })