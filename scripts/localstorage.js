const saveBudgetToLocalStorage = (budget) => {
    
    let budgetAmount = getBudgetlocalStorage();

    if(!budgetAmount.includes(budget)) {
        budgetAmount = budget;
    }

    localStorage.setItem("Budget", JSON.stringify(budget));

}

const saveExpenseToLocalStorage = (expense) => {

    let expenses = getExpenselocalStorage();

    expenses.push(expense);

    localStorage.setItem("Expenses", JSON.stringify(expenses));

};

const getBudgetlocalStorage = () => {

    let localStorageData = localStorage.getItem("Budget");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

const getExpenselocalStorage = () => {
    let localStorageData = localStorage.getItem("Expenses");
    if (localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
};

const removeExpenseFromLocalStorage = (expense) => {
    let expenses = getExpenselocalStorage();
    let index = expenses.findIndex(item => item.name === expense.name && item.amount === expense.amount);
    if (index !== -1) {
        expenses.splice(index, 1);
        localStorage.setItem("Expenses", JSON.stringify(expenses));
    }
};

export {saveBudgetToLocalStorage, saveExpenseToLocalStorage, getBudgetlocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage};