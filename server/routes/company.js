const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const passport = require('passport');
const utils = require('../lib/utils');
require('dotenv').config();
const axios = require('axios');

router.post('/new-company', (req, res, next) => {
    const {company} = req.body;
    const newCompany = new Company({
        name: company.name
    })

    newCompany.save()
    .then(c => {
        res.json({success: true})
    })
    .catch(err => next(err))
})

router.get('/', (req, res, next) => {
    Company.find({})
    .then(c => {
        res.json(c)
    })
    .catch(err => next(err))
})

module.exports = router;