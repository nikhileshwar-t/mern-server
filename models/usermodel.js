const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
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
     
      role: {
        type: Number,
        default: 0,
        required: true
        
        
         },
         address: {
            type: String,
            
            required: true
            
            
             },
 
})

mongoose.model("User",userSchema)