const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const profileValidate = require('../../validation/profile');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/placeholder', (req, res) => res.json({ hola: 1 }));


// passport.authenticate es para seguir usando tokens
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }) // token contiene esta info
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      }
    })
    .catch(err => res.status(404).json());
})

// CHEQUEAR ESTO / AGREGAR CATCH. TODO TESTEAR TODO
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const {errors, isValid} = profileValidate(req.body);

  if (!isValid){
    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.status) profileFields.status = req.body.status;

  Profile.findOne({ user: req.user.id }) // token contiene esta info
  .then(profile => {
    if (!profile) {
      // Create profile
      const newProfile = new Profile(profileFields);
      newProfile.save().then(profile => res.json(profile));
    } else {
      // Update
      Profile.update({ user: profileFields.user }, {$set: profileFields})
      .then(profile => res.json(profile));
    }
  });


})

module.exports = router;
