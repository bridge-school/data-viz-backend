module.exports = function employmentHelper(data) {
  // first we use .reduce to tally each response for employment_status
  const employmentTally = data.reduce((obj, employment) => {
    return {
      ...obj,
      [employment.employment_status]:
        (obj[employment.employment_status] || 0) + 1
    };
  }, []);
  // result of above reduce produces and object where the key is the employment status and value is tally
  // we format this into {label: 'type of employment status', value:'tally'} using object.entries and .map
  return Object.entries(employmentTally).map(([label, value]) => ({
    label,
    value
  }));
};
