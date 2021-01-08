const { Router } = require('express');
var User = require('../models/user');
var Company = require('../models/company');
var Invitation = require('../models/invitation');
const users = require('./users');
const company = require('./company');
const invitation = require('./invitation');

const router = Router();

router.use('/users', users);
router.use('/company', company);
router.use('/invitation', invitation);

module.exports = router;