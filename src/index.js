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
const input = "./src/data.csv";
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
const results = [];

fs.createReadStream(input)
  .pipe(csvParser({
    // we separate our csv data based on comma separation
    separator: ','
  }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // db.collection('cohorts').set({

    //   Cohort: 'cohort-8',
    //   'SHORTLIST? (yes/no)': 'yes',
    //   'Applicant ID': '8d7d0e85-9616-4829-9021-97e44d02c4a8',
    //   'How do you identify?': 'Woman',
    //   'What pronouns should we use?': 'She/her',
    //   'Do you identify as any of the following? Please check all that apply.': 'LGBTQIA+, Neurodiverse',
    //   'How did you hear about Bridge?': 'Friend or family member',
    //   'Have you applied to any Bridge cohorts before?': 'Cohort 5 (September 2018 - November 2018)',
    //   'Current employment status': 'Employed full time',
    //   'Will you be looking for a new job in June 2019 (when you graduate from Bridge)?': 'No',
    //   'Have you attended any web development focused bootcamps?': 'HackerYou',
    //   'Submitted At': '2/24/2019 19:51:51'
      // results
    // })
    console.log(results);
  });
  // console.log(results)

module.exports = {
  app
};
