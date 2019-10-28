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

router.post('/budget', async (req, res) => {
    const createdExpense = await Expenses.create(req.body)
    console.log(createdExpense)
    const user = await User.find(req.session.username)
    user.expenses.push(createdExpense)
    await user.save()
    console.log(user)
    res.send(user)
})

module.exports = router;