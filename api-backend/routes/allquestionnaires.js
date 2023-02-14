const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { allquestionnaires } = require("../controllers/allquestionnaires");

router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), allquestionnaires);

module.exports = router;
