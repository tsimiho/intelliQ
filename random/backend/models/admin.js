var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var bcrypt 		= require('bcrypt');
var async 		= require('async');
var uuid 		= require('node-uuid');
//var cache 		= require('../utils/cacheHandler');
//var utilities	= require('../utils/utilities');

var AdminSchema = new Schema({	
	email: {
		type: String,
		required: true
	},
	admin_id: {
		type: String,
		required: true
	},
	Organization: {
		type: String,
		required: true
	},
	History: {
		type: Array,
		required: true
	}
});
