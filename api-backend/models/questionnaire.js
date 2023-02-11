const mongoose = require("mongoose");
const validator = require("validator");

const OptionSchema = new mongoose.Schema({
    optID: {
        type: String,
        required: true,
    },
    opttxt: {
        type: String,
        required: false,
    },
    nextqID: {
        type: String,
        required: false,
    },
});

const QuestionSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true,
        trim: true,
    },
    qtext: {
        type: String,
        required: true,
        trim: true,
    },
    required: {
        type: String,
        enum: ["TRUE", "FALSE"],
    },
    type: {
        type: String,
        enum: ["question", "profile"],
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
    questionnaireID: {
        type: String,
        required: true,
        unique: true,
    },
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
        required: false,
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
        default: [],
    },
});

module.exports = mongoose.model("QuestionnaireSchema", QuestionnaireSchema);
