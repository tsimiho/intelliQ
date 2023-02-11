const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");


const { signup } = require("../controllers/signup");

router.route("/").post(signup);

module.exports = router;
