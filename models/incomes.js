const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema ({
    description: String,
    amount: Number,
})

module.exports = mongoose.model('Income', incomeSchema);