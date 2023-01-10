const express = require("express");
const app = express();
const questionnaire = require("./routes/questionnaire");
const question = require("./routes/question");
const admin = require("./routes/admin");
const connectDB = require("./database/connect");
const multer  = require('multer')
require("dotenv").config();

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/questionnaire", questionnaire);
app.use("/question", question);
app.use("/admin/", admin);

const port = 9103;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
        // const char = new Questionnaire(t)
        // const doc = await char.save()
        // console.log(doc);
    } catch (error) {
        console.log(error);
    }
};

start();
