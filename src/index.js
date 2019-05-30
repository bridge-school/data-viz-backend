const express = require("express");
const morgan = require("morgan");
const admin = require("firebase-admin");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");

// Create a new express application instance
const app = express();

// Imports for parsing data
// const fs = require('fs');
// const csvParser = require('csv-parser');
// const input = "./src/data.csv";
// const db = require('./db/index.js');

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

//fs.createReadStream seeded our firebase DB with the parsed CSV data from csv-parser package
//Since the data is already in the db, we don't need to run the function each time this file is run.



let string1="";

const scrub = (object1) =>{
  Object.keys(object1).forEach(function (key) {
    console.log(key, object1[key]);
    // `This is ${key}: ${object1[key]}`;
  });
};


// we initialize an empty array to contain our data
// const results = [];

// fs.createReadStream(input)
//   .pipe(csvParser({
    // we separate our csv data based on comma separation
  //   separator: ','
  // }))
  // convert data format here --> create new variable
  // interate through results array in end stream
  // .on('data', (data) => results.push(data))
  // .on('end', () => {
    // loop through rows, set document within
    // foreach
    // each document has unique identifier
    // console.log(results.forEach(applicant => {console.log(scrub(applicant))}));


    // console.log(results.map(applicant => scrub(applicant)));

    // results.forEach(applicant => {
    //   console.log(applicant)
    //   db.collection('candidates').doc(applicant["Applicant ID"]).set({
    //     ...applicant
    //   })
    // })

    //results is an array: this is how to navigate through it
    // console.log(results[0]['How do you identify?'])
  // });








//retrieving the 'applicants' collection from the db
// let applicantsRef = db.collection('applicants');

//accessing the applicants data in the db with the firebase get promise, then can access data within!
//need to call .data() method on the firebase information, then can pass in a key inside of square brackets to access each property
//Firebase has sort/search functionality built in, that might be a route (hehe) to explore: search by cohort, then pass that to the front end

// let allApplicants = applicantsRef.get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.data());
//       // console.log(doc.id, '=>', doc.data());
//       // console.log(doc.data()["Cohort"]);
//       console.log(doc.data()["Do you identify as any of the following? Please check all that apply."]);
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });




module.exports = {
  app
};
