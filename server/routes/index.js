const { Router } = require('express');
var User = require('../models/user');
var Company = require('../models/company');
const users = require('./users');
const company = require('./company');

const router = Router();

router.use('/users', users);
router.use('/company', company);

module.exports = router;