
var bcrypt = require("bcryptjs");
    //Sequelize = require("sequelize");
//const { user } = require(".");

var adminObj =  [
    {
        email: 'email',
        admin_id: '1',
		Organization: 'Microsoft',
        History: []
    },
    {
        email: 'email',
        admin_id: '2',
		Organization: 'Microsoft',
        History: []
    },
    {
        email: 'email',
        admin_id: '3',
		Organization: 'Microsoft',
        History: []
    },
    {
        email: 'email',
        admin_id: '4',
		Organization: 'Microsoft',
        History: []
    },
    {
        email: 'email',
        admin_id: '5',
		Organization: 'Microsoft',
        History: []
    }
]

var userObj =  [
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    },
    {
        email: 'email',
        domain: 'domain',
        History: []
    }
]

var questionnaireObj = [
    {
        questionnaireID: '1',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '1',
        questions: []
    },
    {
        questionnaireID: '2',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '2',
        questions: []
    },
    {
        questionnaireID: '3',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '3',
        questions: []
    },
    {
        questionnaireID: '4',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '1',
        questions: []
    },
    {
        questionnaireID: '1',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '4',
        questions: []
    },
    {
        questionnaireID: '5',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '5',
        questions: []
    },
    {
        questionnaireID: '6',
        questionnaireTitle: 'qtitle',
        domain: ['domain1', 'domain2'],
        admin: '6',
        questions: []
    }
]

		