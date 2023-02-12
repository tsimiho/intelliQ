const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { fullquestionnaire } = require("../controllers/fullquestionnaire");

router.route("/:questionnaireID").get(fullquestionnaire);
router.route("/").get(badreq);

module.exports = router;
