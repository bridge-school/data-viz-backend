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
    separator: ',',
  }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });

module.exports = {
  app
};
