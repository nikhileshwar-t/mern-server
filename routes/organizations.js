const router = require('express').Router();
let Organization = require('../models/organization');

router.route('/').get((req, res) => {
    Organization.find()
    .then(organizations => res.json(organizations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const organization = req.body.organization;
  const website = req.body.website;
  const description = req.body.description;
  const address = req.body.address;
  const contactperson = req.body.contactperson;
  const email = req.body.email;
  const number = Number(req.body.number);
 
 
  const newOrganization = new Organization({organization,website,description,address,contactperson,email,number});

  newOrganization.save()
    .then(() => res.json('Organization added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => res.json(organization))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Organization.findByIdAndDelete(req.params.id)
    .then(() => res.json('Organization deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;