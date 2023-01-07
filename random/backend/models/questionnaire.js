var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var bcrypt 		= require('bcrypt');
var async 		= require('async');
var uuid 		= require('node-uuid');
//var cache 		= require('../utils/cacheHandler');
//var utilities	= require('../utils/utilities');

var AdminSchema = new Schema({	
	questionnaireID: {
		type: Number,
		required: true
	},
	questionnaireTitle: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		required: true
	},
	admin: {
		type: String,
		required: true
	},
    questions: {
        type: Array,
        required: true
    }
});
