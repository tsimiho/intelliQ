var init = require("../database_init.js");
var db = require("../models/admin.js");
var Admin = db.admin;
var Questionnaire = db.questionnaire;

exports.addQuestion = (admin_id, qID) => {
    return Admin.find(admin_id)
        .then((admin) => {
            if (!admin) {
                console.log("admin not found");
                return null;
            }
            return Questionnaire.find(qID).then((questionnaire) => {
                if (!questionnaire) {
                    console.log("questionnaire not found!");
                    return null;
                }
                admin.addQuestion(questionnaire.questions)
                console.log(`>> added qID ID=${questionnaire.id} to admin id=${admin.id}`);
                return admin;
            });
            })
            .catch((err) => {
                console.log(">> Error while adding Question to Admin's Questionnaire: ", err);
              });
        };

