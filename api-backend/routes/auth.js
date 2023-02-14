const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");
const passport = require("passport");

const { login, register, protected } = require("../controllers/adminauth");

router.route("/login").post(login);

router.route("/register").post(register);

router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), protected);

router
    .route("/logout")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        res.status(200).json();
    });

router.route("/").get(badreq);

module.exports = router;
