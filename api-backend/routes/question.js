const express = require('express')
const router = express.Router()

const {
    getQuestion
} = require('../controllers/question')

router.route('/:questionnaireID/:questionID').get(getQuestion)

module.exports = router