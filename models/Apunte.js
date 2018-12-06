const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const apunteSchema = new Schema(
  {
  title:String,
  fileURL:String,
  idOwner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  rate:{
    type:Number,
    default:0
  },
  isPremium:{
    type:Boolean,
    default:false
  }, 
  school:String,
  subject:String,
  period:String,
  teacher:String,
  price:{
    type:Number,
    default:50
  },
  tags:Array
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Apunte = mongoose.model('Apunte', apunteSchema);
module.exports = Apunte;
