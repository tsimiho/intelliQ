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
	required: {
		type: Boolean,
		required: true
	},
	qtype: {
		type: String,
		required: true,
		trim: true
	},
	keywords: {
		type: [String],
		required: true
	},
	options: {
		type: [OptionSchema],
		required: true
	}
})


const QuestionnaireSchema = new mongoose.Schema({
	questions: {
		type: [QuestionSchema],
		required: true
	}


})


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

module.exports = mongoose.model('admin', AdminSchema);
module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
