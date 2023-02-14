const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");

const questionnaire = require("./routes/questionnaire");
const question = require("./routes/question");
const admin = require("./routes/admin");
const doanswer = require("./routes/doanswer");
const getsessionanswers = require("./routes/getsessionanswers");
const getquestionanswers = require("./routes/getquestionanswers");
const extract = require("./routes/extract");
const graph = require("./routes/graph");
const history = require("./routes/history");
const allquestionnaires = require("./routes/allquestionnaires");
const fullquestionnaire = require("./routes/fullquestionnaire");
const firstq = require("./routes/firstq");
const summary = require("./routes/summary");
const auth = require("./routes/auth");
const createquestionnaire = require("./routes/createquestionnaire");

const connectDB = require("./database/connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./config/passport")(passport);
app.use(passport.initialize());

// routes

app.use("/intelliq_api/questionnaire", questionnaire);
app.use("/intelliq_api/question", question);
app.use("/intelliq_api/admin", admin);
app.use("/intelliq_api/doanswer", doanswer);
app.use("/intelliq_api/getsessionanswers", getsessionanswers);
app.use("/intelliq_api/getquestionanswers", getquestionanswers);
app.use("/intelliq_api/extract", extract);
app.use("/intelliq_api/graph", graph);
app.use("/intelliq_api/history", history);
app.use("/intelliq_api/fullquestionnaire", fullquestionnaire);
app.use("/intelliq_api/allquestionnaires", allquestionnaires);
app.use("/intelliq_api/firstq", firstq);
app.use("/intelliq_api/summary", summary);
app.use("/intelliq_api", auth);
app.use("/intelliq_api/createquestionnaire", createquestionnaire);

const port = 9103;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;
