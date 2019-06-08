module.exports = function genderHelper(data) {
  const cohortData = data
    .reduce((array, student) => {
      const studentArray = student.gender.split(', ');
      return array.concat(studentArray);
  }, [])
  .reduce((obj, studentGender)=>{
    return {
      ...obj,
      [studentGender]: (obj[studentGender] || 0) +1
    }
  }, {})
  const genderObj = Object.entries(cohortData).map(([key, value])=>({key, value}));

  return genderObj;
}
