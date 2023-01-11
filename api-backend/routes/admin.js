const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const QuestionnaireSchema = require("../models/questionnaire");
// const mongoose = require('mongoose')

const {
    healthcheck,
    upload_questionnaire,
    resetall,
    resetq,
    usermod,
    users,
} = require("../controllers/admin");

router.route("/healthcheck").get(healthcheck);
router
    .route("/questionnaire_upd")
    .get(upload_questionnaire)
    .post(upload.single("uploaded_file"), function (req, res) {
        try {
            // const new_data = mongoose.model(data);

            // const add_to_db = async (data) => {
            //     const char = new Questionnaire(data);
            //     char.save(function (err, book) {
            //         if (err) return console.error(err);
            //         console.log(" saved to bookstore collection.");
            //     });
            // };

            // try {
            //     add_to_db(data);
            //     console.log("Added to Database");
            // } catch (error) {
            //     console.log(error);
            // }

            const data = JSON.parse(req.file.buffer.toString());
            try {
                QuestionnaireSchema.create(data);
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

module.exports = router;
