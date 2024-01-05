const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/ExpenseController'); // Update controller import

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login'); // Redirect unauthenticated users to login
    }
    next();
}

/* Get route for the Expense List */
// Read Operation
router.get('/expenseList', requireAuth, ExpenseController.displayExpenseList);

/* Get route for Add Expense page --> Create */
router.get('/addExpense', requireAuth, ExpenseController.addExpense);

/* Post route for Add Expense page --> Create */
router.post('/addExpense', requireAuth, ExpenseController.processExpense);

/* Get route for displaying the Edit Expense page --> Update */
router.get('/editExpense/:id', requireAuth, ExpenseController.editExpense);

/* Post route for processing the Edit Expense page --> Update */
router.post('/editExpense/:id', requireAuth, ExpenseController.processEditExpense);

/* Get to perform Delete Operation --> Delete Operation */
router.get('/deleteExpense/:id', requireAuth, ExpenseController.deleteExpense);

module.exports = router;
