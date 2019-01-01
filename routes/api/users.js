const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../../models/User');

router.get('/placeholder', (req, res) =>
  res.json({ hola: 2 })
);

router.post('/register',(req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
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

module.exports = router;
