const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Income = require('../models/incomes');
const Expense = require('../models/expenses');
const bcrypt = require('bcryptjs');
require('../db/db');

router.get('/logout', (req, res) => {
    // creates a brand new cookie, without any of our properties that we previously added to it
    req.session.destroy((err) => {
        err 
            ? console.log(err)
            : res.redirect('/')
    })
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({'_id': req.params.id})
            .populate('incomes').populate('expenses')
        console.log(user);
        res.render('dash/dashboard', {
            user,
        })// with the sessions current shit 
    } catch (err) {
        console.log(err);
    }
})

router.post('/:id/budget/inc', async (req, res) => {
    const createdIncome = await Income.create(req.body);
    console.log(createdIncome)
    const user = await User.findById('5db67f7637910e6eed426d67')
    user.incomes.push(createdIncome);
    await user.save()
    console.log(user)
    res.send(user)
})

router.post('/:id/budget/exp', async (req, res) => {
    console.log('hiiii')
    const createdExpense = await Expense.create(req.body);
    console.log(createdExpense)
    const user = await User.findById('5db67f7637910e6eed426d67')
    user.expenses.push(createdExpense);
    await user.save()
    console.log(user)
    res.send(user)
})

router.delete('/:id', async (req, res) => {
    console.log('delete route');
    
})

module.exports = router;