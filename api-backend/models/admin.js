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
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
    },
    history: {
        type: [QuestionnaireSchema.schema],
        required: false,
    },
    password: {
        type: String,
        // required: [true, "Please provide password"],
        required: false,
        minlength: 6,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
});

AdminSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("AdminSchema", AdminSchema);
