const mongoose = require("mongoose");
const validator = require("validator");


const OptionSchema = new mongoose.Schema({
    opttext: {
        type: String,
        required: false,
    },
    nextqID: {
        type: String,
        required: false,
    },
});

const QuestionSchema = new mongoose.Schema({
    qtext: {
        type: String,
        required: true,
        trim: true,
    },
    require: {
        type: Boolean,
        required: true,
    },
    qtype: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [OptionSchema],
        required: true,
    },
});

const SessionSchema = new mongoose.Schema({
    sessionID: {
        type: String,
        unique: true,
        required: true,
    },
    pairs: {
        type: [
            {
                qID: {
                    type: String,
                    required: true,
                },
                optionID: {
                    type: String,
                    required: false,
                },
            },
        ],
        required: true,
    },
});

const QuestionnaireSchema = new mongoose.Schema({
    questionnaireTitle: {
        type: String,
        required: true,
    },
    domain: {
        type: [String],
        required: false,
    },
    admin: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
    questions: {
        type: [QuestionSchema],
        required: true,
    },
    sessions: {
        type: [SessionSchema],
        required: false,
    },
});

module.exports = mongoose.model("QuestionnaireSchema", QuestionnaireSchema);
