const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.send(400).json({ msg: "Please provide email and password" });
    }

    const ad = AdminSchema.findOne({ username: username });

    if (!ad || (ad && (await bcrypt.compare(password, user.password)))) {
        res.send(401).json({ msg: "Not authorized" });
    } else {
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({ msg: "Login Succesful", token });
    }
};

module.exports = {
    login,
};
