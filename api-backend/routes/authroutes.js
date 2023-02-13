const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user");
const passport = require("passport");
const utils = require("../lib/utils");

router.route("/login").post((req, res, next) => {
    UserSchema.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    success: false,
                    msg: "could not find user",
                });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(
                req.body.password,
                user.hash,
                user.salt
            );

            if (isValid) {
                const tokenObject = utils.issueJWT(user);

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
});

router.route("/register").post((req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new UserSchema({
        username: req.body.username,
        hash: hash,
        salt: salt,
    });

    try {
        newUser.save().then((user) => {
            res.json({ success: true, user: user });
        });
    } catch (err) {
        res.json({ success: false, msg: err });
    }
});

router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        res.status(200).json({
            success: true,
            msg: "You are successfully authenticated to this route!",
        });
    });

module.exports = router;
