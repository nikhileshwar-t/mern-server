const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({

    organization: {
        type: String,
        required: true,
        unique: true



    },
    website: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true


    },

    address: {
        type: String,
        required: true


    },
    contactperson: {
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


}, {
    timestamps: true,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;