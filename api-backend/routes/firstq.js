const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { firstq } = require("../controllers/firstq");

router.route("/:questionnaireID").get(firstq);
router.route("/").get(badreq);

module.exports = router;
