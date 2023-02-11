const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { history } = require("../controllers/history");

router.route("/:questionnaireID").get(history);
router.route("/").get(badreq);

module.exports = router;
