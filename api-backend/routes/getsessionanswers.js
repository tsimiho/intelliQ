const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
router.route("/:questionnaireID/:questionID/:session/:optionID").get(badreq);

const { getSessionanswers } = require("../controllers/getsessionanswers");

router.route("/:questionnaireID/:session").get(getSessionanswers);
router.route("/:questionnaireID/").get(badreq);
router.route("/").get(badreq);

module.exports = router;
