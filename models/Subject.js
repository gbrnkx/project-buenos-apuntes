const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const subjectSchema = new Schema({
  idSchool:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School'
  },
  idTeacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Teacher'
  },
  period:String,
  name:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
