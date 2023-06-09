const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const QuestionnaireSchema = require("../models/questionnaire");
const { addtodb } = require("../controllers/addtodb");
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const {
    healthcheck,
    upload_questionnaire,
    resetall,
    resetq,
    usermod,
    users,
} = require("../controllers/admin");

router
    .route("/healthcheck")
    .get(passport.authenticate("jwt", { session: false }), healthcheck);

router
    .route("/questionnaire_upd")
    .get(passport.authenticate("jwt", { session: false }), upload_questionnaire)
    .post(
        passport.authenticate("jwt", { session: false }),
        upload.single("file"),
        function (req, res) {
            try {
                const data = JSON.parse(req.file.buffer.toString());
                try {
                    addtodb(req, res, data);
                } catch (error) {
                    console.log(error);
                }

                res.status(200).json({ data });
            } catch (error) {
                res.status(500).json({ msg: error });
            }
        }
    );

router
    .route("/resetall")
    .post(passport.authenticate("jwt", { session: false }), resetall);
router
    .route("/resetq/:questionnaireID")
    .post(passport.authenticate("jwt", { session: false }), resetq);
router
    .route("/usermod/:username/:password")
    .post(passport.authenticate("jwt", { session: false }), usermod);
router
    .route("users/:username")
    .get(passport.authenticate("jwt", { session: false }), users);

module.exports = router;
