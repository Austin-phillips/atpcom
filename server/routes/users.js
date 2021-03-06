const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const passport = require('passport');
const utils = require('../lib/utils');
require('dotenv').config();
const axios = require('axios');

// TODO
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ success: true, msg: 'You are authorized!'});
});

router.post('/login', function(req, res, next){
    const {email, password} = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            const isValid = utils.validPassword(password, user.hash, user.salt);

            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                Company.findById(user.companyId)
                .then((company) => {
                    res.status(200).json({ success: true, user, company, token: tokenObject.token, expiresIn: tokenObject.expires })
                })
                .catch(err => next(err))
            } else {
                res.status(401).json({ success: false, msg: 'you entered the incorrect password'})
            }
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/register', function(req, res, next){
    const {first, last, email, phone, password} = req.body;
    const saltHash = utils.genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        first,
        last,
        email,
        phone,
        hash,
        salt
    })

    newUser.save()
        .then((user) => {
            const jwt = utils.issueJWT(user);
            res.json({success: true, user, token: jwt.token, expiresIn: jwt.expires});
        })
        .catch(err => {
            if(err.code === 11000) {
                res.status(500).json({message: `User with email ${email} already exists. Please log in.`})
            } else {
                res.status(500).json({message: 'Error unkown. Please try again.'})
            }
        });
});

router.post('/forgotpassword', (req, res, next) => {
    const {email} = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
                const tokenObject = utils.issueForgotPasswordJWT(user);
                res.status(200).json({ success: true })
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/changepassword', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    const {user} = request;
    const {password} = request.body;
    const saltHash = utils.genPassword(password.password1);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    User.findByIdAndUpdate({_id: user._id}, {
        salt,
        hash
      }, function(err, res) {
        if(err) {
          console.log(err)
        } else {
          response.json({success: true})
        }
     });
     
});

router.get('/validate-token', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    const id = request.user.companyId;
    Company.findById(id)
    .then((company) => {
        response.json({user: request.user, company: company})
    })
    .catch(err => console.log(err))
})

module.exports = router;