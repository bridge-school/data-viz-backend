const express = require("express");
const data = require('../mockData');
const port = process.env.PORT || 8081;
const app = express();

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        (`🎧 Listening at http://localhost:${port}/`);
    });
}

const genderIdentity = (cohort) =>{
    return cohort
    //TODO: make the filter dynamic, or make cohort filter before
    .filter(student => student.cohort === 'cohort-7')
    .reduce((obj, newStudent) => ({
        ...obj,
        [newStudent.gender] : (obj[newStudent.gender] || 0) + 1
    }), {})
};

console.log(genderIdentity(data.data));

