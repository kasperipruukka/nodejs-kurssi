var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var carSchema = new Schema(
  {
     brand: {type: String, required: true, maxlength: 150}, 
     model: {type: String, required: true, maxlength: 150},
     color: {type: String, required: true, maxlength: 150},
     year:  {type: Number, required: true}
  });

// Exportataan malli
module.exports = mongoose.model('Car', carSchema);