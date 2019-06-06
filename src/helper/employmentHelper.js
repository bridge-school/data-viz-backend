const employmentHelper = (data) => {
    return data.reduce((obj, employment) => {
        return {
            ...obj,
            [employment.employment_status] : (obj[employment.employment_status] || 0) +1
        }
    }, {})
}
console.log(employmentHelper(data.data));


module.exports = employmentHelper(data.data);
