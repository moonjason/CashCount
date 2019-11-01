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
            : res.render('home',{
                logOut: 'You have successfully logged out',
            })
    })
})

router.get('/help', async (req, res) => {
    const user = await User.findOne({'username': req.session.username})
    res.render('dash/help', {
        user,
    });
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({'_id': req.params.id})
            .populate('incomes').populate('expenses')
    
        let month = new Array();
            month[0] = "January"; 
            month[1] = "February"; 
            month[2] = "March"; 
            month[3] = "April"; 
            month[4] = "May"; 
            month[5] = "June";
            month[6] = "July"; 
            month[7] = "August"; 
            month[8] = "September"; 
            month[9] = "October"; 
            month[10] = "November"; 
            month[11] = "December"; 
        
            let d = new Date(); 
            let currentMonth = month[d.getMonth()];

        const findBudget = () => {
            let totalInc = 0;
            let totalExp = 0;
            for (let i = 0; i < user.incomes.length; i++) {
                totalInc += user.incomes[i].amount; 
            }
            for (let i = 0; i < user.expenses.length; i++) {
                totalExp += user.expenses[i].amount;
            }
            return totalInc - totalExp;
        }
        const budget = findBudget();

        res.render('dash/dashboard', {
            user,
            currentMonth,
            budget,
        })// with the sessions current shit 
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id/settings', async (req, res) => {
    try {
        req.session.wrongPass = '';
        const user = await User.findOne({'_id': req.params.id});
        res.render('dash/settings', {
            user,
            wrongPass: req.session.wrongPass,
        });
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

router.post('/:id/budget/inc', async (req, res) => {
    const createdIncome = await Income.create(req.body);
    console.log(createdIncome)
    const user = await User.findById(req.params.id)
    user.incomes.push(createdIncome);
    await user.save()
    console.log(user)
    res.send(createdIncome)
})

router.post('/:id/budget/exp', async (req, res) => {
    const createdExpense = await Expense.create(req.body);
    console.log(createdExpense)
    const user = await User.findById(req.params.id)
    user.expenses.push(createdExpense);
    await user.save()
    console.log(user)
    res.send(createdExpense)
})

router.delete('/:id/exp', async (req, res) => {
    console.log(req.params, 'expense delete route');
    try {
        await Expense.findByIdAndRemove(req.params.id);
        const findUser = await User.findOne({'expenses': req.params.id});

        console.log(findUser, 'foundUser')

        findUser.expenses.remove(req.params.id)
        await findUser.save()
        console.log('saved')

        res.redirect(`/dash/${findUser._id}`)
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

router.delete('/:id/inc', async (req, res) => {
    console.log(req.params, 'income delete route');
    try {
        await Income.findByIdAndRemove(req.params.id);
        const findUser = await User.findOne({'incomes': req.params.id});

        console.log(findUser, 'foundUser')

        findUser.incomes.remove(req.params.id)
        await findUser.save()
        console.log('saved')

        res.redirect(`/dash/${findUser._id}`)
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

router.put('/:id/inc', async (req, res) => {
    console.log(req.body.description);
    try {
        const findUpdatedInc = await Income.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const findFoundUser = await User.findOne({'incomes': req.params.id });

        res.redirect(`/dash/${findFoundUser._id}`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/:id/exp', async (req, res) => {
    try {
        const findUpdatedExp = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const findFoundUser = await User.findOne({'expenses': req.params.id });

        res.redirect(`/dash/${findFoundUser._id}`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/:id/settings', async (req, res) => {
    try {
        const foundUser = await User.findOne({'_id': req.params.id})
        if (bcrypt.compareSync(req.body.passwordOld, foundUser.password)) {
            if (req.body.password === req.body.passwordConfirm) {
                req.session.wrongPass = 'Password updated successfully';
                const newPasswordHash = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                foundUser.password = newPasswordHash; 
                foundUser.save();
                res.render('dash/settings', {
                    user: foundUser,
                    wrongPass: req.session.wrongPass,
                })
            } else {
                req.session.wrongPass = 'Passwords do not match';
                res.render('dash/settings' , {
                    user: foundUser,
                    wrongPass: req.session.wrongPass,
                })
            }
        } else {
            req.session.wrongPass = 'Please check your old password';
            res.render('dash/settings' , {
                user: foundUser,
                wrongPass: req.session.wrongPass,
            })
        }
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;