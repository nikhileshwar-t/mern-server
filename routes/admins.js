const router = require('express').Router();
let Admin = require('../models/admin');

router.route('/').get((req, res) => {
    Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
//   const organization = req.body.organization;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const number = Number(req.body.number);
  const password = req.body.password;
 
  const newAdmin = new Admin({organization,firstname,lastname,email,number,password});

  newAdmin.save()
    .then(() => res.json('Admin added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Admin.findById(req.params.id)
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json('Admin deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;