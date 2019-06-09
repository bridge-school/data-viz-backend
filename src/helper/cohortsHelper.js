module.exports = function cohortsHelper(cohorts) {
  //count number of instance
  const counted = cohorts.reduce(function(obj, id) {
    id in obj ? obj[id]++ : (obj[id] = 1);
    return obj;
  }, {});
  //format in to new object with key "label" and "value"
  const result = Object.entries(counted).map(([label, value]) => ({
    label,
    value
  }));

  return result;
};
