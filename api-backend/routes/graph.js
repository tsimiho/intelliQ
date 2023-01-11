const express = require("express");
const router = express.Router();

const { graph } = require("../controllers/graph");

router.route("/:questionnaireID").get(graph);

module.exports = router;
