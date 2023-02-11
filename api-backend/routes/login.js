const express = require("express");
const router = express.Router();
const { badreq } = require("../controllers/badrequest");


const { login } = require("../controllers/login");

const authMiddleware = require("../middleware/auth");

router.route("/").post(login);

module.exports = router;
