const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-credentials.json");
const fs = require('fs');
// const csv = require('csv');
const csvParser = require('csv-parser');
// initialize firebase store
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// we initialize an empty array to contain our data
const results = [];

fs.createReadStream(input)
  .pipe(csvParser({
    separator: ',',
  }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });
// import the db from any file to access firebase!
module.exports = db;
