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
const login = require("./routes/login");
const signup = require("./routes/signup");

const connectDB = require("./database/connect");
require("dotenv").config();

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("intelliq_api/questionnaire", questionnaire);
app.use("intelliq_api/question", question);
app.use("intelliq_api/admin", admin);
app.use("intelliq_api/doanswer", doanswer);
app.use("intelliq_api/getsessionanswers", getsessionanswers);
app.use("intelliq_api/getquestionanswers", getquestionanswers);
app.use("intelliq_api/extract", extract);
app.use("intelliq_api/graph", graph);
app.use("intelliq_api/history", history);
app.use("intelliq_api/login", login);
app.use("intelliq_api/signup", signup);

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
