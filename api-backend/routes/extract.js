const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { extract_json, extract_csv } = require("../controllers/extract");

router.route("/json/:questionnaireID").get(extract_json);
router.route("/csv/:questionnaireID").get(extract_csv);
router.route("/json").get(badreq);
router.route("/csv").get(badreq);

module.exports = router;
