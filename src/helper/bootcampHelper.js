module.exports = function bootcampHelper(data) {
  const studentArray = data
  .reduce((array, student) => {
    const studentArray = student.bootcamp.split(', ');
    //have reduce spit out final object
    return array.concat(studentArray);
  }, [])
.reduce((obj, item)=>{
  return {
    ...obj,

  [item] : (obj[item] || 0) +1
  }
}, {});

const dataObj = Object.assign(studentArray.map(school =>({
  label: school[0],
  value: school[1]
})))
// .sort((a,b) =>  a-b)

  //look at bootcamp, split it, concatenate to accumulator array -- done

  //1. map: comma separate + concatenate into one big array
  //2. reduce -->


  //includes hackeryou, brainstation, no bootcamp, other
  return dataObj;
};


// const finishedObj = [{ 'label': 'hackeryou', value: 0 },
// { 'label': 'bitmaker', value: 0 },
// { 'label': 'other', value: 0 },
// { 'label': 'i have never attended a bootcamp', value: 0 }
// ];
// finishedObj.