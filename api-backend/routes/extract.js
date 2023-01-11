const express = require("express");
const router = express.Router();

const { extract_json, extract_csv } = require("../controllers/extract");

router.route("/json/:questionnaireID").get(extract_json);
router.route("/csv/:questionnaireID").get(extract_csv);

module.exports = router;
