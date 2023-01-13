const AdminSchema = require("../models/admin");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const check = await AdminSchema.findOne({
            username: username,
        });
        const check2 = await AdminSchema.findOne({
            email: email,
        });
        if (check) {
            res.status(400).json({
                msg: "Bad request. Admin username already exists.",
            });
        } else if (check2) {
            res.status(400).json({
                msg: "Bad request. Admin email already exists.",
            });
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    signup,
};
