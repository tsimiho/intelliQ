const express = require("express");
const router = express.Router();

const {
    healthcheck,
    questionnaire_upd,
    resetall,
    resetq,
    usermod,
    users
} = require("../controllers/admin");

router.route("/healthcheck").get(healthcheck);
router.route("/questionnaire_upd").post(questionnaire_upd);
router.route("/resetall").post(resetall);
router.route("/resetq/:questionnaireID").post(resetq);
router.route("/usermod/:username/:password").post(usermod);
router.route("users/:username").get(users);

module.exports = router;
