const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const check = await Admin.findOne({
      username: username,
    });
    const check2 = await Admin.findOne({
      email: email,
    });
    if (check) {
      res
        .status(400)
        .json({ msg: "Bad request. Admin username already exists." });
    } else if (check2) {
      res.status(400).json({ msg: "Bad request. Admin email already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = {
        username: username,
        email: email,
        password: hashedPassword,
        history: [],
      };

      AdminSchema.create(admin);
      res.status(200).json({ msg: "Admin created." });
    }
  } catch {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  signup,
};
