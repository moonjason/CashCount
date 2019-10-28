const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('dash/dashboard'); // with the sessions current shit 
})

router.get('/logout', (req, res) => {
    // creates a brand new cookie, without any of our properties that we previously added to it
    req.session.destroy((err) => {
        err 
            ? console.log(err)
            : res.redirect('/')
    })
})

module.exports = router;