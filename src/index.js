const express = require("express");
const morgan = require("morgan");
const admin = require("firebase-admin");
const cors = require('cors');

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
app.use(cors());
app.use("/", router);
app.use(errorHandler);

// Serve the application at the given port
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}
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

//retrieving the 'applicants' collection from the db
let applicantsRef = db.collection("applicants");

module.exports = {
  app
};
