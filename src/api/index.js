const express = require("express");

const { healthRouter } = require('../routes/health/health.router');
const cohortRouter = require('../routes/cohorts');


const router = express.Router();
router.use("/health", healthRouter);
router.use('/cohorts', cohortRouter);

module.exports = router;
