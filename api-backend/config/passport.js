const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const AdminSchema = require("../models/admin");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromHeader("x-observatory-auth"),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, function (jwt_payload, done) {
            AdminSchema.findOne({ _id: jwt_payload.sub }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};
