const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const teacherSchema = new Schema({
  name:String,
  idSchool:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
