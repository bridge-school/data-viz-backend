const express = require("express");
const data = require("./mockData.js");
const port = process.env.PORT || 8081;
const app = express();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    `🎧 Listening at http://localhost:${port}/`;
  });
}
const employmentHelper = (data) => {
    const employmentTally =  data.reduce((obj, employment) => {
        return {
            ...obj,
            [employment.employment_status] : (obj[employment.employment_status] || 0) +1
        }
    }, [])
    return Object.entries(employmentTally).map(([key, value]) => ({label:key,value:value}));

}
console.log(employmentHelper(data.data));


module.exports = employmentHelper(data.data);
