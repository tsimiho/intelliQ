const QuestionnaireSchema = require("../models/questionnaire");
const AdminSchema = require("../models/admin");
const { findOneAndUpdate } = require("../models/questionnaire");

async function addtodb(req, res, data) {
    var temp_id = data.questionnaireID;
    makeid = (n) => {
        var prefix = "QQ";
        var postfix = n.toString().padStart(3, "0");
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

    data.questionnaireID = temp_id;

    var admin_id = req.user._id;
    var admin = await AdminSchema.findOne({ _id: admin_id });

    if (admin) {
        var admin_history = admin.history;

        admin_history.push(temp_id);

        try {
            await AdminSchema.findOneAndUpdate(
                { _id: admin_id },
                { history: admin_history }
            );
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    QuestionnaireSchema.create(data);
}

module.exports = { addtodb };
