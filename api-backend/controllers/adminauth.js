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

                res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires,
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

const register = (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newAdmin = new AdminSchema({
        username: req.body.username,
        hash: hash,
        salt: salt,
    });

    try {
        newAdmin.save().then((admin) => {
            res.json({ success: true, user: admin });
        });
    } catch (err) {
        res.json({ success: false, msg: err });
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
