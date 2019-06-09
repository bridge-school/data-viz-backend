const db = require("../../db/index");
const employmentHelper = require("../../helper/employmentHelper.js");
const genderHelper = require("../../helper/genderHelper.js");
const minorityHelper = require("../../helper/minorityHelper.js");
const bootcampHelper = require("../../helper/bootcampHelper.js");
const cohortsHelper = require("../../helper/cohortsHelper.js");

const cohortsRef = db.collection("cohorts");

//get all cohorts data
const index = (req, res) => {
  cohortsRef
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

//get a single cohort data for bar graph
const cohortId = (req, res) => {
  cohortsRef
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

//get application number of all cohorts for line graph and cohort list
const applicationNumber = (req, res) => {
  cohortsRef
    .orderBy("cohort")
    .get()
    .then(snapshot => {
      const cohorts = snapshot.docs.map(doc => {
        return doc.data().cohort;
      });
      res.json({
        //pass array of cohorts id into helper function to get final results
        data: cohortsHelper(cohorts)
      });
    })
    .catch(error => {
      res.json({ error });
    });
};

module.exports = {
  index,
  cohortId,
  applicationNumber
};
