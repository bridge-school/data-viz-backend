const express = require("express");

const { healthRouter } = require("../routes/health/health.router");
const { cohortsRouter } = require("../routes/cohorts/cohorts.router");

const router = express.Router();
router.use("/health", healthRouter);
router.use("", cohortsRouter);

module.exports = router;
