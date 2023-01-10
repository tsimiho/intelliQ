const mongoose = require('mongoose')
const QuestionnaireSchema = require('./questionnaire')


const AdminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	Organization: {
		type: String,
		required: true,
		trim: true
	},
	History: {
		type: [QuestionnaireSchema],
		required: true
	}
});

module.exports = mongoose.model('AdminSchema', AdminSchema);