// need Id's for: budget input, expense name input, expense amount, button to remove expense from list, a div where expenses are displayed, text where money left is displayed
// we need a function for on page load it get's data in local storage and fills in appropriate spots with data
// a function to create elements when adding expenses

import { saveBudgetToLocalStorage, saveExpenseToLocalStorage, getBudgetlocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage } from "./localstorage.js";

let budgetInput = document.getElementById('budgetInput');
let budgetSetBtn = document.getElementById('budgetSetBtn');
let budgetDisplay = document.getElementById('budgetDisplay');
let budgetAfterExpensesDisplay = document.getElementById('budgetAfterExpensesDisplay');
let expenseAddBtn = document.getElementById('expenseAddBtn');
let expenseNameInput = document.getElementById('expenseNameInput');
let expenseAmountInput = document.getElementById('expenseAmountInput');
let expenseSetBtn = document.getElementById('expenseSetBtn');
let expenseDisplay = document.getElementById('expenseDisplay');
let modalDisplay = document.getElementById('modalDisplay');
let modalFooter = document.getElementById('modalFooter');

let budgetAmount = '';
let expenses = [];
let budgetAfterExpenses = '';


const updatePage = async () => {
    expenseDisplay.textContent = '';
    budgetAmount = getBudgetlocalStorage();
    expenses = getExpenselocalStorage();
    budgetAfterExpenses = budgetAmount;

    if (budgetAmount > 0) {
        budgetDisplay.textContent = "Budget: $" + budgetAmount;
    } else {
        budgetDisplay.textContent = "Budget: $0";
    }

    expenses.map(expense => {
        let row = document.createElement('div');
        row.className = 'row';
        let p = document.createElement('p');
        p.className = 'd-flex justify-content-between';
        p.textContent = expense.name + " $" + expense.amount;
        let button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.type = 'button';
        button.textContent = 'Remove'

        button.addEventListener('click', () => {
            removeExpenseFromLocalStorage(expense);
            updatePage();
        })

        p.append(button)
        expenseDisplay.append(p);

        budgetAfterExpenses -= Number(expense.amount);
    });

    budgetAfterExpensesDisplay.textContent = "After Expenses: $" + budgetAfterExpenses;
}


const updateBudget = async () => {
    if(budgetAmount > 0) {
        budgetDisplay.textContent = "$" + budgetAmount;
        console.log('works')
    } else {
        budgetDisplay.textContent = "$0";
    }
}

expenseAddBtn.addEventListener('click', () => {
    expenseAmountInput.value = '';
})

expenseSetBtn.addEventListener('click', () => {
    expenseDisplay.textContent = '';
    let expenseName = expenseNameInput.value;
    let expenseAmount = expenseAmountInput.value;
    let expense = { name: expenseName, amount: expenseAmount };
    saveExpenseToLocalStorage(expense);
    updatePage();
});


budgetSetBtn.addEventListener('click', () => {
    budgetAmount = budgetInput.value;
    budgetInput.value = '';
    updateBudget()
    saveBudgetToLocalStorage(budgetAmount);
    updatePage();
})

updatePage();