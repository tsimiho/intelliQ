const QuestionnaireSchema = require("../models/questionnaire");

questionnaire_counter = 0;

function addtodb(data) {
    var prefix = "QQ";
    questionnaire_counter++;
    console.log(questionnaire_counter);
    var postfix = questionnaire_counter
        .toString()
        .padStart(4 - questionnaire_counter.toString().length, "0");

    const result = prefix + postfix;

    // data.questionnaireID = result;

    QuestionnaireSchema.create(data);
}

module.exports = { addtodb };
