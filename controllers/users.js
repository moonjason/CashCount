const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})
// registration 
// login

router.post('/register',  async (req, res) => {
    const password = req.body.password2;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

    const userDbEntry = {}; 

    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash; 
    userDbEntry.email = req.body.email; 

    const createdUser = await User.create(userDbEntry);
    console.log(createdUser);
    req.session.username = createdUser.eventNames;
    req.session.logged = true; 

    res.redirect('dashboard');
})

module.exports = router;