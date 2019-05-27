const express = require("express");
const morgan = require("morgan");
const admin = require("firebase-admin");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");

// Create a new express application instance
const app = express();

// Imports for parsing data
const fs = require('fs');
const csvParser = require('csv-parser');
const input = "/Users/leandra_reid/code/bridge-project/data-viz-backend/src/data.csv";
const db = require('./db/index.js');

// The port the express app will listen on
const port = process.env.PORT || 8081;

logger.info("🤖 Initializing middleware");

app.use(morgan("tiny", { stream: logger.stream }));
app.use("/", router);
app.use(errorHandler);

// Serve the application at the given port
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}
// we initialize an empty array to contain our data
// const results = [];

// fs.createReadStream(input)
//   .pipe(csvParser({
    // we separate our csv data based on comma separation
    separator: ','
  // }))
  //convert data format here --> create new variable
  //interate through results array in end stream
  // .on('data', (data) => results.push(data))
  // .on('end', () => {
    //loop through rows, set document within
    //foreach
    //each document has unique identifier
    // results.forEach(applicant => {
      // console.log(applicant)
      // db.collection('applicants').doc(applicant["Applicant ID"]).set({
      //   ...applicant
      // })
    // })


    // console.log(results);
  // });

let applicantsRef = db.collection('applicants');
let allApplicants = applicantsRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      // console.log(doc.data()["Cohort"]);
      console.log(doc.data()["Do you identify as any of the following? Please check all that apply."]);
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


module.exports = {
  app
};
