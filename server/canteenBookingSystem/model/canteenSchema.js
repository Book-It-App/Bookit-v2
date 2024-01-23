const mongoose = require('mongoose');

const canteenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  }, 
  canteenCreater: {
    type: String,
    required: true,
  },
});

const Canteen = mongoose.model('Canteen', canteenSchema);

module.exports = Canteen;
