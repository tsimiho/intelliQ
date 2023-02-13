const mongoose = require("mongoose");
const validator = require("validator");
const QuestionnaireSchema = require("./questionnaire");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        default: undefined,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
    },
    history: {
        type: [String],
        required: false,
        default: [],
    },

    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
});

module.exports = mongoose.model("AdminSchema", AdminSchema);
