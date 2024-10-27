const mongoose = require('mongoose');

const importantNumSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  work: {
    type: String,
    required: true
  },
},
{
    timestamps:true
}
);


const impotantNum = mongoose.model('impotNum', importantNumSchema);

module.exports = impotantNum;
