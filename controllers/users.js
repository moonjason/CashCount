const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})
// registration 
// login

module.exports = router;