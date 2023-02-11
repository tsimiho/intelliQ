const QuestionnaireSchema = require("../models/questionnaire");

async function addtodb(data) {
    var temp_id = data.questionnaireID;

    makeid = (n) => {
        var prefix = "QQ";
        var postfix = n.toString().padStart(4 - n.toString().length, "0");
        const result = prefix + postfix;
        return result;
    };

    var questionnaire = await QuestionnaireSchema.findOne({
        questionnaireID: temp_id,
    });

    while (questionnaire) {
        var num = parseInt(temp_id.slice(-3));
        temp_id = makeid(num + 1);
        questionnaire = await QuestionnaireSchema.findOne({
            questionnaireID: temp_id,
        });
    }

    data.questionnaireID = tempID;

    // data.questionnaireID = result;

    QuestionnaireSchema.create(data);
}

module.exports = { addtodb };
