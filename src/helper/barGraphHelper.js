module.exports = function barGraphHelper(data, key) {
  let counted = data
    .reduce((array, student) => {
      const newArray = student[key].split(", ");
      //have reduce spit out final object
      return array.concat(newArray);
    }, [])
    //remove empty strings
    .filter(Boolean)
    .reduce((obj, item) => {
      return {
        ...obj,
        [item]: (obj[item] || 0) + 1
      };
    }, {});

  // in the bootcamp and minority have a group called "other"
  if (key === "bootcamp" || key === "minority") {
    //if value is less than 4, group these people to "other"
    counted = Object.entries(counted).reduce((obj, cur) => {
      if (cur[1] < 4) {
        return { ...obj, others: obj.others ? obj.others + cur[1] : cur[1] };
      }
      return { ...obj, [cur[0]]: cur[1] };
    }, {});
  }
  //format in to new object with key "label" and "value"
  const result = Object.entries(counted).map(([label, value]) => ({
    label,
    value
  }));

  return result;
};
