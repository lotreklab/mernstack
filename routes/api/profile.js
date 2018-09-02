const express = require('express')
const passport = require('passport');
const keys = require('../../config/keys');
const mongoose = require('mongoose');
const Profile = require('../../models/Profile')
const User = require('../../models/User')


const router = express.Router();


router.get('/test', (req, res) => res.json({msg: 'Profile works!'}));


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noProfile = "There's no profile for the current user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(400).json(err))
});


module.exports = router;
