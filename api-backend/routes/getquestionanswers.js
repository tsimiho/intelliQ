const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { getquestionanswers } = require("../controllers/getquestionanswers");

router.route("/:questionnaireID/:questionID").get(getquestionanswers);
router.route("/:questionnaireID").get(badreq);
router.route("/").get(badreq);

module.exports = router;
