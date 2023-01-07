var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var bcrypt 		= require('bcrypt');
var async 		= require('async');
var uuid 		= require('node-uuid');
//var cache 		= require('../utils/cacheHandler');
//var utilities	= require('../utils/utilities');

var UserSchema = new Schema({	
	email: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		required: true
	},
	History: {
		type: Array,
		required: true
	}
});
