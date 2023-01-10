const OptionSchema = require('../models/questionnaire')
const ItemSchema = require('../models/user')

const postOptionID = async (req, res) => {
    try {
        const { questionnaireID, questionID, session, optionID } = req.params
        const createOption = async (req, res) => {
            try {
            const task = await OptionSchema.create(req.body)
            res.status(201).json({ Option })
            }
            catch {
                res.status(500).json({ msg: error })
            }
          }

        // const question = await questionnaire.findOne({ questions: { _id: questionID } })

        // if (!question) {
        //     res.status(400).json({ msg: 'Bad request' })
        // }

       // res.status(200).json({ question })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    postOptionID
}