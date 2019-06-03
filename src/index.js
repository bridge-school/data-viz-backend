const express = require("express");
const morgan = require("morgan");
const admin = require("firebase-admin");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");

// Create a new express application instance
const app = express();

// Imports for parsing data
const fs = require("fs");
const csvParser = require("csv-parser");

const input = "./src/data.csv";
const db = require("./db/index.js");

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
<<<<<<< HEAD
//we initialize an empty array to contain our data
const results = [];

fs.createReadStream(input)
  .pipe(
    csvParser({
      headers: [
        "cohort",
        "shortlist",
        "applicant_id",
        "gender",
        "pronouns",
        "minority",
        "bridge_referral_from",
        "applied_cohort",
        "employment_status",
        "seeking_job_after",
        "bootcamp",
        "time_submitted",
        "token"
      ],
      mapValues: ({ header, index, value }) => value.toLowerCase()
    })
  )
  .on("data", data => results.push(data))
  .on("end", () => {
    results.shift();
    console.log(results);
  });
=======
// we initialize an empty array to contain our data
// const results = [];

// fs.createReadStream(input)
//   .pipe(csvParser({
//     // we separate our csv data based on comma separation
//     separator: ',',
//   }))
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//   });

//fs.createReadStream seeded our firebase DB with the parsed CSV data from csv-parser package
//Since the data is already in the db, we don't need to run the function each time this file is run.



// we initialize an empty array to contain our data


    // })

    //results is an array: this is how to navigate through it
    // console.log(results[0]['How do you identify?'])
  // });





>>>>>>> 7e32d659e8409e0d1cadb7675e6e134d038897e0

//retrieving the 'applicants' collection from the db
let applicantsRef = db.collection("applicants");

module.exports = {
  app
};
