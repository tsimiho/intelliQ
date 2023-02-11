const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { getQuestion } = require("../controllers/question");

router.route("/:questionnaireID/:questionID").get(getQuestion);
router.route("/:questionnaireID").get(badreq);
router.route("/").get(badreq);

module.exports = router;
