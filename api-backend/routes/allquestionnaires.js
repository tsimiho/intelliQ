const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { allquestionnaires } = require("../controllers/allquestionnaires");

router.route("/").get(allquestionnaires);

module.exports = router;
