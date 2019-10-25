const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/signup', (req, res) => {
    res.render('signup')
})

// registration 
// login

module.exports = router;