const express = require("express");
const app = express();
const questionnaire = require("./routes/questionnaire");
const question = require("./routes/question");
const admin = require("./routes/admin");
const doanswer = require("./routes/doanswer");
const getsessionanswers = require("./routes/getsessionanswers");
const getquestionanswers = require("./routes/getquestionanswers");
const extract = require("./routes/extract");
const graph = require("./routes/graph");
const history = require("./routes/history");

const connectDB = require("./database/connect");
require("dotenv").config();

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/questionnaire", questionnaire);
app.use("/question", question);
app.use("/admin", admin);
app.use("/doanswer", doanswer);
app.use("/getsessionanswers", getsessionanswers);
app.use("/getquestionanswers", getquestionanswers);
app.use("/extract", extract);
app.use("/graph", graph);
app.use("/history", history);

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
