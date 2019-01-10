const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

router.get('/placeholder', (req, res) =>
  res.json({ hola: 2 })
);

router.post('/register',(req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      //console.log(email);
      //console.log(user);
      if(user) {
        return res.status(400).json({email: "Email already exists"});
      } else {
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        });

        console.log(req);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });
      }
    })
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
      .then(user => {
        if(!user) { //Si al buscar no encuentra usuario con ese email
          return res.status(404).json({email: 'User not found'});
        }

        // Si es que lo encuentra, que chequee que contrasena es correcta
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch) { // con json web token
                  const payload = {
                    id: user.id,
                    name: user.name,
                  };
                  // Sign token
                    jwt.sign(payload, keys.key, {expiresIn: 3600}, (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      })
                    });

                } else {
                  return res.status(400).json({password: 'incorrect password'});
                }
              });
      });
});


module.exports = router;
