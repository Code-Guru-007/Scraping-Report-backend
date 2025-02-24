const fs = require('fs');
const defFinanzeItModel = require('../model/def.finanze.it');
const mongoose = require('mongoose');

// Create
exports.createReport = async (req, res) => {
  try {
    const newReport = new defFinanzeItModel(req.body);
    await newReport.save();
    return res.json({ status: "success" });
  } catch (error) {
    console.log("=======     Create Report      =======\n", error);
    return res.json({ status: 'failed', error: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  const { filterDate, page, rowsPerPage, subType } = req.query;

  try {
    const filter = {};

    // Add date filter if filterDate is provided and valid.
    if (filterDate && filterDate !== "null" && filterDate !== "undefined") {
      const date = new Date(filterDate);
      const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));
      filter.dateTime = { $gte: startOfDay, $lte: endOfDay };
    }

    // Add filsLink filter to match subType at the start of the string.
    if (subType && subType !== "null" && subType !== "undefined") {
      filter.fileLink = { $regex: '^' + subType, $options: 'i' };
    }

    // Query reports based on the filter object.
    const reports = await defFinanzeItModel
      .find(filter)
      .sort({ dateTime: -1 })
      .skip(parseInt(page) * parseInt(rowsPerPage))
      .limit(parseInt(rowsPerPage));

    const total = await defFinanzeItModel.countDocuments(filter);

    return res.json({ status: 'success', reports, total });
  } catch (error) {
    console.error("======= Get All Reports Error =======\n", error);
    return res.json({ status: 'failed', error: error.message });
  }
};
