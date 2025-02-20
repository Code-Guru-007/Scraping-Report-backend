const express = require('express');
const normattivaLocalController = require('../controller/normattiva_local');

const router = express.Router();

router
  .get('/', normattivaLocalController.getAllReports)
  .post('/', normattivaLocalController.createReport)
  ;

exports.router = router;  