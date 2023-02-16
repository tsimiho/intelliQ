const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");
const addtodb = require("../controllers/addtodb");

router
    .route("/")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        try {
            const data = req.body;
            try {
                addtodb(req, res, data);
            } catch (error) {
                console.log(error);
            }

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    });

module.exports = router;
