const express = require('express');
const normattivaController = require('../controller/normattiva');

const router = express.Router();

router
  .get('/', normattivaController.getAllReports)
  .post('/', normattivaController.createReport)
  ;

exports.router = router;  