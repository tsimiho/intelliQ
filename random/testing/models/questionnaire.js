const mongoose = require('mongoose')


const OptionSchema = new mongoose.Schema({
    opttext: {
        type: String,
        required: true
    },
    nextqID: {
        type: String,
        required: false
    },
    times_answered: {
        type: Number
    }
})

const QuestionSchema = new mongoose.Schema({
    qtext: {
        type: String,
        required: true,
        trim: true
    },
    require: {
        type: Boolean,
        required: true
    },
    qtype: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [OptionSchema],
        required: true
    }
})


const QuestionnaireSchema = new mongoose.Schema({
    questionnaireTitle: {
        type: String,
        required: true
    },
    domain: {
        type: [String],
        required: false
    },
    admin: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    questions: {
        type: [QuestionSchema],
        required: true
    }


})


module.exports = mongoose.model('QuestionnaireSchema', QuestionnaireSchema);