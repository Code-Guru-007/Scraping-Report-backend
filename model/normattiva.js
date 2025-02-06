const mongoose = require('mongoose');
const { Schema } = mongoose;

const normattivaSchema = new Schema({
    dateTime: { type: Date,  },
    status: { type: Boolean, },
    fileName: { type: String, unique: true},
    fileLink: { type: String, }
  });

const normattivaModel = mongoose.model('Normattiva', normattivaSchema);

module.exports = normattivaModel;