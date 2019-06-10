module.exports = function minorityHelper(data) {
  const counted = data
    .reduce((array, minority) => {
      const minorityArray = minority.minority.split(", ");
      return array.concat(minorityArray);
    }, [])
    //filter out empty string
    .filter(Boolean)
    //count instance return a object
    .reduce((obj, cur) => {
      return { ...obj, [cur]: (obj[cur] || 0) + 1 };
    }, {});

  //if value is less than 4, group these people to "other"
  const groupedObject = Object.entries(counted).reduce((obj, cur) => {
    if (cur[1] < 4) {
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
