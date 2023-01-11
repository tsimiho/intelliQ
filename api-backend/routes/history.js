const express = require("express");
const router = express.Router();

const { history } = require("../controllers/history");

router.route("/:questionnaireID").get(history);

module.exports = router;