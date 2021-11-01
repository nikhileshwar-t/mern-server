const router = require('express').Router();
let Role = require('../models/role');

router.route('/').get((req, res) => {
    Role.find()
        .then(roles => res.json(roles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const role = req.body.role;
    const roledescription = req.body.roledescription;
    const organization = req.body.organization;


    const newRole = new Role({role,roledescription, organization});

    newRole.save()
        .then(() => res.json('Role added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Role.findById(req.params.id)
        .then(role => res.json(role))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Role.findByIdAndDelete(req.params.id)
        .then(() => res.json('Role deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;