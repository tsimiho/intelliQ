const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { graph } = require("../controllers/graph");

router
    .route("/:questionnaireID")
    .get(passport.authenticate("jwt", { session: false }), graph);
router.route("/").get(badreq);

module.exports = router;
