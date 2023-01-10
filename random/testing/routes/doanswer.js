const express = require('express')
const router = express.Router()

const {
    postOptionID
} = require('../controllers/doanswer')

router.route('/:questionnaireID/:questionID/:session/:optionID').post(postOptionID)

module.exports = router