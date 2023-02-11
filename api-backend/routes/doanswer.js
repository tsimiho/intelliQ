const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");

const { postOptionID } = require("../controllers/doanswer");

router
    .route("/:questionnaireID/:questionID/:session/:optionID")
    .post(postOptionID);
router.route("/:questionnaireID").get(badreq);
router.route("/:questionnaireID/:questionID").get(badreq);
router.route("/:questionnaireID/:questionID/:session").get(badreq);

module.exports = router;
