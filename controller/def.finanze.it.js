const fs = require('fs');
const defFinanzeItModel = require('../model/def.finanze.it')
const mongoose = require('mongoose');

// Create
exports.createReport = async (req, res) => {
  try {
    const newReport = new defFinanzeItModel(req.body);
    await newReport.save()
    return res.json({status: "success"})
  } catch (error) {
    console.log("=======     Create Product      =======\n", error)
    return res.json({status: 'failed', error: error.message})
  }

};

exports.getAllReports = async (req, res) => {
  const { filterDate } = req.query; // Get filterDate from query params

  try {
      let reports;
      console.log(typeof filterDate)
      if (filterDate === "null" || filterDate === "undefined") {
        reports = await defFinanzeItModel.find().sort({dateTime: -1});
      } else {
        const date = new Date(filterDate);
        const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)); // 00:00:00 UTC
        const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999)); // 23:59:59 UTC

        reports = await defFinanzeItModel.find({
          dateTime: { $gte: startOfDay, $lte: endOfDay }
        }).sort({dateTime: -1});
      }
      return res.json({ status: 'success', reports });
  } catch (error) {
      console.error("======= Get All Reports Error =======\n", error);
      return res.json({ status: 'failed', error: error.message });
  }
};

// exports.getProduct = async (req, res) => {
//   const id = req.params.id;
//   console.log({id})
//   const product = await Product.findById(id);
//   res.json(product);
// };
// exports.replaceProduct = async (req, res) => {
//   const id = req.params.id;
//   try{
//   const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
//   res.status(201).json(doc);
//   }
//   catch(err){
//     console.log(err);
//     res.status(400).json(err);
//   }
// };
// exports.updateProduct = async (req, res) => {
//   const id = req.params.id;
//   try{
//   const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
//   res.status(201).json(doc);
//   }
//   catch(err){
//     console.log(err);
//     res.status(400).json(err);
//   }
// };
// exports.deleteProduct = async (req, res) => {
//   const id = req.params.id;
//   try{
//   const doc = await Product.findOneAndDelete({_id:id})
//   res.status(201).json(doc);
//   }
//   catch(err){
//     console.log(err);
//     res.status(400).json(err);
//   }
// };
