const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { history } = require("../controllers/history");

router
    .route("/:questionnaireID")
    .get(passport.authenticate("jwt", { session: false }), history);
router.route("/").get(badreq);

module.exports = router;
