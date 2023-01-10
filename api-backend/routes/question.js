const express = require('express')
const router = express.Router()

const {
    getQuestionnaire
} = require('../controllers/question')

router.route('/:questionnaireID/:questionID').get(getQuestionnaire)

module.exports = router