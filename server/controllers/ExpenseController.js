// Other imports
let Expense = require('../models/Expense'); // Update model import

module.exports.displayExpenseList = async (req, res, next) => {
    try {
        const expenseList = await Expense.find();
        res.render('expense/expenseList', {
            title: 'Expense List',
            expenses: expenseList,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error on the server'
        });
    }
};

module.exports.addExpense = async (req, res, next) => {
    try {
        res.render('expense/addExpense', {
            title: 'Add Expense',
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error on the server'
        });
    }
};

module.exports.processExpense = async (req, res, next) => {
    try {
        await Expense.create({
            "amount": req.body.amount,
            "category": req.body.category,
            "description": req.body.description,
            "date": req.body.date
        });
        res.redirect('/expense/expenseList');
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error on the server'
        });
    }
};

module.exports.editExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const expenseToEdit = await Expense.findById(id);
        res.render('expense/editExpense', {
            title: 'Edit Expense',
            expense: expenseToEdit,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error on the server'
        });
    }
};

module.exports.processEditExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Expense.findByIdAndUpdate(id, {
            "amount": req.body.amount,
            "category": req.body.category,
            "description": req.body.description,
            "date": req.body.date
        });
        res.redirect('/expense/expenseList');
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error updating the expense'
        });
    }
};

module.exports.deleteExpense = async (req, res, next) => {
    try {
        let id = req.params.id;
        await Expense.deleteOne({ _id: id });
        res.redirect('/expense/expenseList');
    } catch (err) {
        console.error(err);
        res.render('error', {
            error: 'Error on the server'
        });
    }
};
