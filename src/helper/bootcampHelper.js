module.exports = function bootcampHelper(data) {
  const counted = data
    .reduce((array, student) => {
      const bootcampArray = student.bootcamp.split(", ");
      //have reduce spit out final object
      return array.concat(bootcampArray);
    }, [])
    //remove empty strings
    .filter(Boolean)
    .reduce((obj, item) => {
      return {
        ...obj,
        [item]: (obj[item] || 0) + 1
      };
    }, {});

  //if value is less than 3, group these people to "other"
  const groupedObject = Object.entries(counted).reduce((obj, cur) => {
    if (cur[1] < 3) {
      return { ...obj, others: obj.others ? obj.others + cur[1] : cur[1] };
    }
    return { ...obj, [cur[0]]: cur[1] };
  }, {});

  //format in to new object with key "label" and "value"
  const result = Object.entries(groupedObject).map(([label, value]) => ({
    label,
    value
  }));

  return result;
};
