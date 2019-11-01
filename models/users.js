const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    incomes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income',
    }],
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
    }]
})

module.exports = mongoose.model('User', userSchema);