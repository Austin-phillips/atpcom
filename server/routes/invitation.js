const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Invitation = mongoose.model('Invitation');
const passport = require('passport');
const utils = require('../lib/utils');
const {newUserEmail} = require('../emails/newUser');
require('dotenv').config();
const axios = require('axios');

router.post('/new-invitation', (req, res, next) => {
    const {firstName, lastName, email, _id, companyName} = req.body.invitation;
    const invitation = new Invitation({
        firstName,
        lastName,
        email,
        companyId: _id
    })

    invitation.save()
    .then(i => {
        newUserEmail(i._id, companyName, email)
        res.json({success: true})
    })
    .catch(err => next(err))
})

module.exports = router;