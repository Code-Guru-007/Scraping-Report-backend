const fs = require('fs');
const normattivaModel = require('../model/normattiva')
const mongoose = require('mongoose');

// Create
exports.createReport = async (req, res) => {
  try {
    const newReport = new normattivaModel(req.body);
    await newReport.save()
    return res.json({status: "success"})
  } catch (error) {
    console.log("=======     Create Product      =======\n", error)
    return res.json({status: 'failed'})
  }

};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await normattivaModel.find();
    return res.json({status: 'success', reports});
  } catch (error) {
    console.log("=======     Get All Reports      =======\n", error)
    return res.json({status: 'failed'})
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
