//TODO: Move removing event listeners to when delete a row

import { Expense, currentDate } from './modules/expense.js'

const emptyRow = new Expense();

const expenses = [
    new Expense('Groceries', 50, 'food', '2024-07-12'),
    new Expense('Gas', 30, 'bill', '2024-08-03'),
    new Expense('Dinner', 60, 'food', '2024-08-05'),
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
    // TODO: Use more different insert methods to practice
    table.replaceChildren();

    table.appendChild(headerRow.content.cloneNode(true));
    
    expenses.forEach((expense,) => {
        const row = expenseRow.content.cloneNode(true);
                
        hydrateRow(row, expense.name, expense.price, expense.type, expense.date);
        
        table.appendChild(row);
    });
}

function hydrateRow(row, name, price, type, date) {
    // TODO: Look into attribute selector
    row.querySelector('td[id=name]').textContent = name;
    row.querySelector('td[id=price]').textContent = price;
    row.querySelector('td[id=type]').textContent = type;
    row.querySelector('td[id=date]').textContent = date;
}

function addEmptyRow() {
    const row = expenseRow.content.cloneNode(true);
    hydrateRow(row, emptyRow)
    table.appendChild(row)
}

function updateExpenses(index, name, price, type, date) {
    expenses[index].name = name;
    expenses[index].price = price;
    expenses[index].type = type;
    expenses[index].date = date;  
}

function validateInputEvent(inputBox) {
    if (!inputBox.checkValidity()) {
        inputBox.classList.add('is-invalid');
    } else {
        inputBox.classList.remove('is-invalid');
    }
}

function createInputBox(cell, data) {
    const inputBox = document.createElement('input');
    if (cell.getAttribute('id') === 'date') {
        inputBox.type = 'date';
    } else {
        inputBox.type = 'text';
    }
    inputBox.value = data;
    inputBox.classList.add('form-control');
    inputBox.required = true;

    inputBox.addEventListener('input', validateInputEvent(inputBox));

    cell.innerHTML = '';
    cell.appendChild(inputBox);
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

    const editButton = row.querySelector('.edit-button');
    editButton.replaceWith(createSaveButton());

    const nameCell = row.querySelector('td[id=name]');
    const priceCell = row.querySelector('td[id=name]');
    const typeCell = row.querySelector('td[id=name]');
    const dateCell = row.querySelector('td[id=name]');

    createInputBox(nameCell, expenses[index].name);
    createInputBox(priceCell, expenses[index].price);
    createInputBox(typeCell, expenses[index].type);
    createInputBox(dateCell, expenses[index].date);
}

function saveExpense(index) {
    const row = table.rows[index+1];

    const nameInput = row.querySelector('td[id=name] input');
    const priceInput = row.querySelector('td[id=name] input');
    const typeInput = row.querySelector('td[id=name] input');
    const dateInput = row.querySelector('td[id=name] input');

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const type = typeInput.value.trim();
    const date = dateInput.value.trim();

    // Use event listener
    if (!validateInput(nameInput) || !validateInput(priceInput) || !validateInput(typeInput) || !validateInput(dateInput)) {
        return;
    }

    // Remove event listener somewhere
    nameInput.removeEventListener('input', validateInputEvent);
    priceInput.removeEventListener('input', validateInputEvent);
    typeInput.removeEventListener('input', validateInputEvent);
    dateInput.removeEventListener('input', validateInputEvent);

    const saveButton = row.querySelector('.save-button');
    saveButton.replaceWith(createEditButton());  
    
    updateExpenses(index, name, price, type, date);
    hydrateRow(row, expenses[index].name, expenses[index].price, expenses[index].type, expenses[index].date);
}

function validateInput(input) {
    return input.checkValidity();
}

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