const data = require('../mockData');


const genderIdentity = (cohort) =>{
    return cohort
    //TODO: make the filter dynamic, or make cohort filter before
    .filter(student => student.cohort === 'cohort-7')
    .map(student => student.gender.split(","))
    // .reduce((obj, newStudent) =>
    // ({
    //     ...obj,
    //     // let split = newStudent.gender.split()
    //     [newStudent.gender] : (obj[newStudent.gender] || 0) + 1
    // }), {})
};

console.log(genderIdentity(data.data));

module.exports = function genderHelper(data) {
  return data;
};
