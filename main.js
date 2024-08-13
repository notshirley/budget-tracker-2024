const currentDate = new Date().toLocaleDateString();
const emptyRow = {name: "", price: "", type: "", dateAdded: currentDate};

const expenses = [
    {
        name: "Groceries",
        price: 50,
        type: "food",
        dateAdded: currentDate
    },
    {
        name: "Gas",
        price: 30,
        type: "bill",
        dateAdded:  currentDate
    },
    {
        name: "Dinner",
        price: 60,
        type: "food",
        dateAdded: currentDate
    }
];

const  table = document.querySelector('#spendingsTable');
const headerRowtemplate = document.getElementById('headerRowtemplate').content;
const contentRowtemplate = document.getElementById('expenseRowTemplate').content;

function updateTable() {
    table.innerHTML = '';

    const headerRow = document.importNode(headerRowtemplate, true);
    table.appendChild(headerRow);
    
    expenses.forEach((expense, index) => {
        const row = document.importNode(contentRowtemplate, true);

        row.querySelector('.delete-button').addEventListener('click', () => removeExpense(index));
        row.querySelector('.edit-button').addEventListener('click', () => editExpense(index));

        row.querySelector('.name').textContent = expense.name;
        row.querySelector('.price').textContent = expense.price;
        row.querySelector('.type').textContent = expense.type;
        row.querySelector('.date-added').textContent = expense.dateAdded;

        table.appendChild(row);
    });
}

document.getElementById("add-button").addEventListener('click', () => addNewExpense());

function addNewExpense() {
    expenses.push({...emptyRow}); 
    updateTable();
    editExpense(expenses.length - 1);

}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}

function editExpense(index) {
    const row = table.rows[index+1];

    row.querySelector('.name').contentEditable = true;
    row.querySelector('.price').contentEditable = true;
    row.querySelector('.type').contentEditable = true;

    const editButton = row.querySelector('.edit-button');
    editButton.innerHTML = '<i class="material-icons save-icon">save</i>';
    editButton.addEventListener('click', () => saveExpense(index, row));
}

function saveExpense(index, row) {
    expenses[index].name = row.querySelector('.name').textContent;
    expenses[index].price = row.querySelector('.price').textContent;
    expenses[index].type = row.querySelector('.type').textContent;
    expenses[index].dateAdded = currentDate;

    if (expenses[index].name && expenses[index].price && expenses[index].type) {
        row.querySelector('.name').contentEditable = false;
        row.querySelector('.price').contentEditable = false;
        row.querySelector('.type').contentEditable = false;
    
        const saveButton = row.querySelector('.edit-button');
        saveButton.innerHTML = '<i class="material-icons">edit</i>';
        saveButton.addEventListener('click', () => editExpense(index));
    }
}


updateTable()

function toggleTheme() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.toggle('text-light');
    })

    document.querySelectorAll('.material-icons').forEach(icon => {
        icon.classList.toggle('light');
    })
}

// Attach event listener to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

