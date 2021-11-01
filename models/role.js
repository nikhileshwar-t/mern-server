const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({

    organization: {
        type: String,
        required: true,
        unique: true
        
       
      
      },
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
      admin: {
        type: Boolean,
        required: true
       
      },
      role: {
        type: String,
        default:0,
        required: true
        
         },

}, {
    timestamps: true,
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;