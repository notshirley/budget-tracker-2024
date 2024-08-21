// Create module for expense
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

init(); //app init

function init() {
    updateTable();
    attachEventListeners();
}

function updateTable() {
    // Look into different ways to insert to insert HTML other than innerHTML
    // table.empty();
    $('#expensesTable').empty(); //also has other functions to add/remove other HTML

    table.appendChild(headerRow.content.cloneNode(true));
    
    expenses.forEach((expense, index) => {
        const row = expenseRow.content.cloneNode(true);
                
        // Separate Hydration method for adding row data
        hydrateRow(row, expense.name, expense.price, expense.type, expense.date);
        
        table.appendChild(row);
    });
}

function hydrateRow(row, name, price, type, date) {
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

// Separate click and action
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

//Replace editableContent with input boxes with error detection
function editExpense(index) {
    const row = table.rows[index+1];

    const saveButton = row.querySelector('.edit-button');
    $(saveButton).replaceWith('<button class="save-button btn"><i class="material-icons">save</i></button>');

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

    if (!validateInput(nameInput, name) || !validateInput(priceInput, price) || !validateInput(typeInput, type)) {
        return;
    }

    const editButton = row.querySelector('.save-button');
    
    $(editButton).replaceWith('<button class="edit-button btn"><i class="material-icons">edit</i></button>');
    
    removeInputBox(nameCell, name);
    removeInputBox(priceCell, price);
    removeInputBox(typeCell, type);
    
    row.querySelector('.save-button')?.removeEventListener('click', () => onClickSaveButton(index));
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

// Add all event listeners once
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
    
    // Bootstrap color mode
    document.querySelector('#color-mode-button').addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', newTheme);
    })
}

