const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploaded_files/" });
const fs = require("fs");

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
            const { destination, filename } = req.file;

            const path = destination + filename;

            fs.readFile(String(path), "utf8", (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                json_file = result;
            });

            res.status(200).json(json_file);
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    });
router.route("/resetall").post(resetall);
router.route("/resetq/:questionnaireID").post(resetq);
router.route("/usermod/:username/:password").post(usermod);
router.route("users/:username").get(users);

module.exports = router;
