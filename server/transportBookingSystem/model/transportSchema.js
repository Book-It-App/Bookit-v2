const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },

  trasportType:{
    type: String,
    required: true,
  },

  nameOfDriver:{
    type: String,
    required: true,

  },
  mobNoOfDriver:{
    type: Number,
    required: true,
  },
  // capacity: {
  //   type: Number,
  //   required: true,
  // },  
  // photo: {
  //   type: String,
  //   required: true,
  // },  
  // description: {
  //   type: String,
  //   required: true,
  // },
  transportCreater: {
    type: String,
    required: true,
  },
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
