const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");

const authMiddleware = require("../middleware/auth");

router.route("/").post(login);

module.exports = router;
