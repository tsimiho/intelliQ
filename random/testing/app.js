const express = require('express');
const app = express();
const tasks = require('./routes/admin');
const connectDB = require('./database/connect');
require('dotenv').config();
// const notFound = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/questionnaire', questionnaire);


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