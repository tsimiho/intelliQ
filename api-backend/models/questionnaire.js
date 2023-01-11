const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    opttext: {
        type: String,
        required: false,
    },
    nextqID: {
        type: String,
        required: false,
    },
    times_answered: {
        type: Number,
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
        randomGeneratedString: {
            type: String,
            default: (generateRandom = () => {
                function makeid(length) {
                    var result = "";
                    var characters =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(
                            Math.floor(Math.random() * charactersLength)
                        );
                    }
                    return result;
                }
                return makeid(4);
            }),
        },
        unique: true,
        required: true,
    },
    pairs: {
        type: [
            {
                qID: {
                    type: String,
                    required: true,
                    ref: "Question",
                },
                optionID: {
                    type: String,
                    required: false,
                    ref: "Option",
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
// module.exports = mongoose.model("OptionSchema", OptionSchema);
