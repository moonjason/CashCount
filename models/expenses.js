const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema ({
    description: String,
    amount: Number,
})

module.exports = mongoose.model('Expense', expenseSchema);