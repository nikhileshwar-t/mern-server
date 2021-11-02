const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')


router.get('/users',(req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.post("/register", (req, res) => {
  
    const {organization,firstname,lastname,email,number,password,role,address} = req.body 
    if(!organization || !firstname || !lastname || !email || !number || !password || !role || !address ){
       return res.status(422).json({error:"please add all the fields"}) 
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
           return res.status(422).
           json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                 
                  organization,
                  firstname,
                  lastname,
                  email,
                  number,
                  password:hashedpassword,
                  
                  role,address
              })
      
              user.save()
              .then(user=>{
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })

});

router.post("/login", (req, res) => {
    

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,role} = savedUser
               res.json({token,user:{_id,name,email,role}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

  });

  router.get("/protected",requireLogin,(req, res) => {
      
  })
  router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router
