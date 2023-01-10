const mongoose = require('mongoose')
const QuestionnaireSchema = require('./questionnaire')



const QnASchema = new mongoose.Schema({
    optID: {
        type: String,
        required: true,
        trim: true,
    },
});

const ItemSchema = new mongoose.Schema({
    QnA: {
        type: [QnASchema],
        required: true
    },
    QuestionnaireID: {
        type: String,
        required: true,
        ref: QuestionnaireSchema
    },
    Session: {
        type: Number,
        randomGeneratedString: {
            type: String,
            default: generateRandom = () => {       
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
return makeid(4);
            }
        },
        unique: true,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    domain: {
        type: String,
    },
    History: {
        type: [ItemSchema],
        required: true
    }
})

module.exports = mongoose.model('ItemSchema', ItemSchema);


