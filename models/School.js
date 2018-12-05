const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schoolSchema = new Schema({
  long_name:String,
  short_name:String,
  logoURL:{
    type:String,
    default:"Agregar"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const School = mongoose.model('School', schoolSchema);
module.exports = School;
