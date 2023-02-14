const express = require("express");
const router = express.Router();
const AdminSchema = require("../models/admin");
const passport = require("passport");
const utils = require("../lib/utils");

const login = (req, res, next) => {
    AdminSchema.findOne({ username: req.body.username })
        .then((admin) => {
            if (!admin) {
                res.status(401).json({
                    success: false,
                    msg: "could not find admin",
                });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(
                req.body.password,
                admin.hash,
                admin.salt
            );

            if (isValid) {
                const tokenObject = utils.issueJWT(admin);

                res.status(200).format({
                    "application/x-www-form-urlencoded": () => {
                        res.json({
                            token: tokenObject.token,
                        });
                    },
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "you entered the wrong password",
                });
            }
        })
        .catch((err) => {
            next(err);
        });
};

const register = async (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const findadmin = await AdminSchema.findOne({
        username: req.body.username,
    });

    if (findadmin) {
        await AdminSchema.deleteOne({ username: req.body.username });
    }

    const newAdmin = new AdminSchema({
        username: req.body.username,
        hash: hash,
        salt: salt,
    });

    var admin_id = req.user._id;
    var logged_admin = await AdminSchema.findOne({ _id: admin_id });

    if (logged_admin) {
        if (logged_admin.username === "SuperAdmin") {
            try {
                newAdmin.save().then((admin) => {
                    res.status(200).json({ success: true, user: admin });
                });
            } catch (err) {
                res.status(500).json({ success: false, msg: err });
            }
        } else {
            res.status(401).json({ error: "You are not authorized" });
        }
    } else {
        res.status(401).json({ error: "You are not authorized" });
    }
};

const protected = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "You are successfully authenticated to this route!",
    });
};

module.exports = {
    login,
    register,
    protected,
};
