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
    type:boolean,
    default:false
  }, 
  idSchool:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School'
  },
  idSubject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject'
  },
  period:String,
  teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Teacher'
  },
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
