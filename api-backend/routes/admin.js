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

const { login, register, protected } = require("../controllers/adminauth");

router.route("/healthcheck").get(healthcheck);

router
    .route("/questionnaire_upd")
    .get(upload_questionnaire)
    .post(upload.single("file"), function (req, res) {
        try {
            const data = JSON.parse(req.file.buffer.toString());
            try {
                addtodb(data, req, res);
            } catch (error) {
                console.log(error);
            }

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    });

router.route("/resetall").post(resetall);
router.route("/resetq/:questionnaireID").post(resetq);
router.route("/usermod/:username/:password").post(usermod);
router.route("users/:username").get(users);

router.route("/login").post(login);

router.route("/register").post(register);

router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), protected);

module.exports = router;
