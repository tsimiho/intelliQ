const express = require("express");
const router = express.Router();
const AdminSchema = require("../models/admin");
const passport = require("passport");
const utils = require("../lib/utils");
const { login, register, protected } = require("../controllers/adminauth");

router.route("/login").post(login);

router.route("/register").post(register);

router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), protected);

module.exports = router;
