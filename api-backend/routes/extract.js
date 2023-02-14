const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { extract_json, extract_csv } = require("../controllers/extract");

router
    .route("/json/:questionnaireID")
    .get(passport.authenticate("jwt", { session: false }), extract_json);
router
    .route("/csv/:questionnaireID")
    .get(passport.authenticate("jwt", { session: false }), extract_csv);
router.route("/json").get(badreq);
router.route("/csv").get(badreq);

module.exports = router;
