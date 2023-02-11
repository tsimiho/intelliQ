const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { graph } = require("../controllers/graph");

router.route("/:questionnaireID").get(graph);
router.route("/").get(badreq);

module.exports = router;
