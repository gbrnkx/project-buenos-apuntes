const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name:String,
  email:{
    type:String,
    required:true,
    unique:true
  },
  school:{
    type:Number,
    ref:'School'
  },
  photo:{
    type:String,
    default:'https://res.cloudinary.com/gbrnkx/image/upload/v1543883121/buenos-apuntes/pp/default_pp.png'
  },
  userRate:{
    type:Number,
    default:0
  },
  isPremium:{
    type:Boolean,
    default:false
  },
  role:{
    type:String,
    enum:['free', 'premium', 'editor', 'notVerified', 'master'],
    default:'notVerified'
  },
  credits:{
    type:Number,
    default:0
  },
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
