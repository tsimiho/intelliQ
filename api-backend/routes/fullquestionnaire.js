const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { fullquestionnaire } = require("../controllers/fullquestionnaire");

router
    .route("/:questionnaireID")
    .get(passport.authenticate("jwt", { session: false }), fullquestionnaire);
router.route("/").get(badreq);

module.exports = router;
