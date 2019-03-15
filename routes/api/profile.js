const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/placeholder', (req, res) => res.json({ hola: 1 }));

module.exports = router;
