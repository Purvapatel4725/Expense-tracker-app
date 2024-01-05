const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    amount: Number,
    category: String,
    description: String,
    date: { type: Date, default: Date.now } // Date of the expense, defaults to current date
},
{
    collection: "Expenses" // Collection name in your database
});

module.exports = mongoose.model('Expense', expenseSchema);
