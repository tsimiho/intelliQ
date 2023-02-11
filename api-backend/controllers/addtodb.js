const QuestionnaireSchema = require("../models/questionnaire");

function addtodb(data) {
    var temp_id = data.questionnaireID;

    var prefix = "QQ";
    questionnaire_counter++;
    var postfix = questionnaire_counter
        .toString()
        .padStart(4 - questionnaire_counter.toString().length, "0");

    const result = prefix + postfix;

    // data.questionnaireID = result;

    QuestionnaireSchema.create(data);
}

module.exports = { addtodb };
