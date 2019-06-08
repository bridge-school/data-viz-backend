const express = require("express");

const cohortsController = require("./cohorts.controller");

const router = express.Router();

//get all cohorts
router.get("", cohortsController.index);

//get application number in all cohorts for line graph and cohort list
router.get("/application", cohortsController.applicationNumber);

//get single cohort info for bar graph
router.get("/cohorts/:id", cohortsController.cohortId);

module.exports = {
  cohortsRouter: router
};
