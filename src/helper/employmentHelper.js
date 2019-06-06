const express = require("express");
const data = require('./mockData.js');
const port = process.env.PORT || 8081;
const app = express();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    `🎧 Listening at http://localhost:${port}/`;
  });
}


const employmentHelper = (data) => {
    // we need to reduce the original array
    // we need to split the employment data by comma into an array
    // we need to increment each of the values from these arrays (use reduce)

    return data.reduce((obj, employment) => ({
        ...obj,
        [employment.employment_status] : (obj[employment.employment_status] || 0) +1
    }))
}
console.log(employmentHelper(data.data));
//  sweet it works now! thanks!!!


module.exports = employmentHelper(data.data);
