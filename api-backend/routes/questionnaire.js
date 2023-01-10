const express = require('express')
const router = express.Router()

const {
    getQuestionnaire
} = require('../controllers/questionnaire')

router.route('/:questionnaireID').get(getQuestionnaire)

module.exports = router