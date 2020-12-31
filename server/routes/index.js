const { Router } = require('express');
var User = require('../models/user');
const users = require('./users');

const router = Router();

router.use('/users', users);

module.exports = router;