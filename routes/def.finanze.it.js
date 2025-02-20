const express = require('express');
const defFinanzeItController = require('../controller/def.finanze.it');

const router = express.Router();

router
  .get('/', defFinanzeItController.getAllReports)
  .post('/', defFinanzeItController.createReport)
  ;

exports.router = router;  