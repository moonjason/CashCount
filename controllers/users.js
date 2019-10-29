const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
    res.render('auth/register', {
        msg: req.session.msg,
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login', {
        msg: req.session.msg, 
        logOut: req.session.logOutMsg,
    })
})
// registration 
// login
router.post('/register',  async (req, res) => {
    if (req.body.password1 === req.body.password2) {
        req.session.msg = '';
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

        res.redirect('../dash'); //render req.session.username's items?? 
    } else {
        req.session.msg = 'Passwords do not match'
        res.redirect('register')
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        // if User.findOne returns null/undefined we'll catch an error
        if (user) {
            // if there is a username... compare their passwords 
            if(bcrypt.compareSync(req.body.password, user.password)){
                //start sesh
                req.session.msg = '';
                // if there are no failed attempts, there is no message
                // set two properties on the sessionn called username and logged 
                req.session.username = user.username;
                req.session.logged = true;
                console.log(req.session);
                res.redirect(`../dash/${user._id}`)
            } else {
                req.session.msg = 'Username or Password is Incorrect'
                res.redirect('login')
            }
        } else {
            req.session.msg = 'Username or Password is Incorrect'
        }
    } catch(err) {
        console.log(err);
    }
})



module.exports = router;