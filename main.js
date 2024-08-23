// Determine why table is extending off page - fixed using container-fluid
// TODO: Look into Bootstrap validation
// TODO: Look into why icons lags

import { Expense, currentDate } from './modules/expense.js'

const emptyRow = new Expense();

const expenses = [
    new Expense('Groceries', 50, 'food'),
    new Expense('Gas', 30, 'bill'),
    new Expense('Dinner', 60, 'food'),
];
const table = document.querySelector('#expensesTable');
const headerRow = document.querySelector('#headerRow');
const expenseRow = document.querySelector('#expenseRow');

init();

function init() {
    updateTable();
    attachEventListeners();
}

function updateTable() {
    // Look into different ways to insert to insert HTML other than innerHTML
    /* Research attempts!
        innerHTML
        jquery - bad, should use pure JS
        replaceChildren
        found insertAdjacentHTML/Element/Text and insertBefore
    */

    table.appendChild(headerRow.content.cloneNode(true));
    
    expenses.forEach((expense,) => {
        const row = expenseRow.content.cloneNode(true);
                
        hydrateRow(row, expense.name, expense.price, expense.type, expense.date);
        
        table.appendChild(row);
    });
}

function hydrateRow(row, name, price, type, date) {
    // TODO: Look into attribute selector
    row.querySelector('#name').textContent = name;
    row.querySelector('#price').textContent = price;
    row.querySelector('#type').textContent = type;
    row.querySelector('#date').textContent = date;
}

function addEmptyRow() {
    const row = expenseRow.content.cloneNode(true);
    hydrateRow(row, emptyRow)
    table.appendChild(row)
}

function updateExpenses(index, name, price, type) {
    expenses[index].name = name;
    expenses[index].price = price;
    expenses[index].type = type;
    expenses[index].date = currentDate;  
}

function createInputBox(cell, data) {
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.value = data;
    inputBox.classList.add('form-control');
    cell.innerHTML = '';
    cell.appendChild(inputBox);
}

function removeInputBox(cell, data) {
    cell.innerHTML = data;
}

function onClickAddButton(index) {
    addNewExpense(index);
}

function onClickDeleteButton(index) {
    deleteExpense(index);
}

function onClickEditButton(index) {
    editExpense(index);
}

function onClickSaveButton(index) {
    saveExpense(index);
}

function addNewExpense() {
    expenses.push({...emptyRow}); 
    addEmptyRow();
    editExpense(expenses.length - 1);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}

function editExpense(index) {
    const row = table.rows[index+1];

    const saveButton = row.querySelector('.edit-button');
    saveButton.replaceWith(createSaveButton());

    const nameCell = row.querySelector('#name');
    const priceCell = row.querySelector('#price');
    const typeCell = row.querySelector('#type');

    createInputBox(nameCell, expenses[index].name);
    createInputBox(priceCell, expenses[index].price);
    createInputBox(typeCell, expenses[index].type);
}

function saveExpense(index) {
    const row = table.rows[index+1];

    const nameInput = row.querySelector('#name input');
    const priceInput = row.querySelector('#price input');
    const typeInput = row.querySelector('#type input');

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const type = typeInput.value.trim();
    
    const nameCell = row.querySelector('#name');
    const priceCell = row.querySelector('#price');
    const typeCell = row.querySelector('#type');

    // Use onChange event listener, explore different events that can be used with inputs
    if (!validateInput(nameInput, name) || !validateInput(priceInput, price) || !validateInput(typeInput, type)) {
        return;
    }

    const editButton = row.querySelector('.save-button');
    editButton.replaceWith(createEditButton());  
    
    updateExpenses(index, name, price, type);
    hydrateRow(row, expenses[index].name, expenses[index].price, expenses[index].type, expenses[index].date);
}

function validateInput(input, value) {
    if (!value.trim()) {
        input.classList.add('invalid-input');
        return false;
    } else {
        input.classList.remove('invalid-input');
        return true;
    }
}

// Properly remove an event listener somewhere
function attachEventListeners() {
    document.querySelector('#add-button').addEventListener('click', onClickAddButton);

    table.addEventListener('click', function(event) {
        const target = event.target;
    
        if (target.closest('.delete-button')) {
            const row = target.closest('tr');
            const index = row.rowIndex - 1;
            onClickDeleteButton(index);
        }
    
        if (target.closest('.edit-button')) {
            const row = target.closest('tr');
            const index = row.rowIndex - 1;
            onClickEditButton(index);
        }

        if (target.closest('.save-button')) {
            const row = target.closest('tr');
            const index = row.rowIndex - 1;
            onClickSaveButton(index);
        }
    });
    
    document.querySelector('#color-mode-button').addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', newTheme);
    })
}

function createEditButton() {
    const button = document.createElement('button')
    button.className = "btn edit-button";

    const icon = document.createElement('icon');
    icon.className = "bi bi-pencil";

    button.appendChild(icon);
    return button
}

function createSaveButton() {
    const button = document.createElement('button')
    button.className = "btn save-button";

    const icon = document.createElement('icon');
    icon.className = "bi bi-floppy";

    button.appendChild(icon);
    return button
}