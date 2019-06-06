const express = require("express");

const { cohortsController, cohortController } = require("./cohorts.controller");

const router = express.Router();

//get all cohorts
router.get("", cohortsController);
//get single cohort
router.get("/:id", cohortController);

module.exports = {
  cohortsRouter: router
};
