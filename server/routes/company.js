const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const passport = require('passport');
const utils = require('../lib/utils');
require('dotenv').config();
const axios = require('axios');

module.exports = router;