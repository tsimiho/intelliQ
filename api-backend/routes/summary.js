const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { summary } = require("../controllers/summary");

router.route("/:questionnaireID/:sessionID").get(summary);
router.route("/:questionnaireID").get(badreq);
router.route("/").get(badreq);

module.exports = router;
