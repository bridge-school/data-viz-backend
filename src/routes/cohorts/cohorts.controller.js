const db = require("../../db/index");
const employmentHelper = require("../../helper/employmentHelper.js");
const genderHelper = require("../../helper/genderHelper.js");
const minorityHelper = require("../../helper/minorityHelper.js");
const bootcampHelper = require("../../helper/bootcampHelper.js");

//get all cohorts data
const cohortsController = (req, res) => {
  db.collection("cohorts")
    .get()
    .then(snapshot => {
      res.json({
        data: snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        })
      });
    })
    .catch(error => {
      res.json({ error });
    });
};

//get a single cohort data
const cohortController = (req, res) => {
  db.collection("cohorts")
    .where("cohort", "==", req.params.id)
    .get()
    .then(snapshot => {
      const data = snapshot.docs.map(doc => {
        const { gender, bootcamp, employment_status, minority } = doc.data();
        return { gender, bootcamp, employment_status, minority };
      });
      res.json({
        //pass data to helper functions to format data
        gender: genderHelper(data),
        minority: minorityHelper(data),
        bootcamp: bootcampHelper(data),
        employment_status: employmentHelper(data)
      });
    })

    .catch(error => {
      res.json({ error });
    });
};

module.exports = {
  cohortsController,
  cohortController
};
