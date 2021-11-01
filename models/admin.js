const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
 
  // organization: {
  //   type: String,
  //   required: true,
  //   unique: true
    
   
  
  // },
  firstname: {
    type: String,
    required: true
 
  },
  lastname: {
    type: String,
    required: true
    
  
  },
  number: {
    type: Number,
    required: true
  
    
  },
  email: {
    type: String,
    required: true
    
  
  },
  password: {
    type: String,
    required: true
    
  
  },
  
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;