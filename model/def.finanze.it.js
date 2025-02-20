const mongoose = require('mongoose');
const { Schema } = mongoose;

const normattivaLocalSchema = new Schema({
    dateTime: { type: Date,  },
    status: { type: Boolean, },
    fileName: { type: String, },
    fileLink: { type: String, }
  });

const defFinanzeItModel = mongoose.model('DefFinanzeIt', normattivaLocalSchema);

module.exports = defFinanzeItModel;