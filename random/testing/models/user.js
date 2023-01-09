const mongoose = require('mongoose')


const QnASchema = new mongoose.Schema({
    optID: {
        type: String,
        required: true,
        trim: true
    }
})

const ItemSchema = new mongoose.Schema({
    QnA: {
        type: [QnASchema],
        required: true
    }
})


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String
    },
    History: {
        type: [ItemSchema],
        required: true
    }
})