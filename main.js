// TODO:  Toggle light/dark mode, bootstrap!
// TODO:  Look into HTML Templates & web components
// TODO:  Inline table edits - no alerts. List & edit view maybe.

const currentDate = new Date().toLocaleDateString()

const expenses = [
    {
        expense: "Groceries",
        price: 50,
        type: "food",
        dateAdded: currentDate
    },
    {
        expense: "Gas",
        price: 30,
        type: "bill",
        dateAdded:  currentDate
    },
    {
        expense: "Dinner",
        price: 60,
        type: "food",
        dateAdded: currentDate
    }
];


function updateTable() {
    const  table = document.querySelector('#spendingsTable');
    table.innerHTML = '';

    const headerRow = document.createElement('tr');
    const actionsHeader = document.createElement('th');
    actionsHeader.textContent = 'Actions';
    headerRow.appendChild(actionsHeader);

    const expenseHeader = document.createElement('th');
    expenseHeader.textContent = 'Expense';
    headerRow.appendChild(expenseHeader);

    const priceHeader = document.createElement('th');
    priceHeader.textContent = 'Price';
    headerRow.appendChild(priceHeader);

    const typeHeader = document.createElement('th');
    typeHeader.textContent = 'Type';
    headerRow.appendChild(typeHeader);

    const dateAddedHeader = document.createElement('th');
    dateAddedHeader.textContent = 'Date Added';
    headerRow.appendChild(dateAddedHeader);

    table.appendChild(headerRow);
    
    expenses.forEach((spending, index) => {
        const row = document.createElement('tr');
    
        const buttonsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="material-icons table-button">delete</i>';
        deleteButton.onclick = function() {
            removeExpense(index);
        };

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="material-icons table-button">edit</i>';
        editButton.onclick = function() {
            editExpense(index);
        };
    
        buttonsCell.appendChild(deleteButton);
        buttonsCell.appendChild(editButton);
    
        row.appendChild(buttonsCell);
        
        const expenseCell = document.createElement('td');
        expenseCell.textContent = spending.expense;
        row.appendChild(expenseCell);
    
        const priceCell = document.createElement('td');
        priceCell.textContent = spending.price;
        row.appendChild(priceCell);
    
        const typeCell = document.createElement('td');
        typeCell.textContent = spending.type;
        row.appendChild(typeCell);
    
        const dateAddedCell = document.createElement('td');
        dateAddedCell.textContent = spending.dateAdded;
        row.appendChild(dateAddedCell);
        
        table.appendChild(row);
    });

    const addRow = document.createElement('tr');
    const addButton = document.createElement('button');
    addButton.innerHTML = '<i class="material-icons">add</i>'
    addButton.addEventListener('click', addNewExpense);
    addRow.appendChild(addButton);
    table.appendChild(addRow);
}

function addNewExpense() {
    const newExpense = prompt("What is the expense?");
    const newPrice = prompt("How much was it?");
    const newType = prompt("What kind of expense is it?");

    if (newExpense !== null && newPrice !== null && newType !== null) {
        expenses.push({
            expense: newExpense, 
            price: newPrice, 
            type: newType, 
            dateAdded: currentDate
        })
        updateTable()
    }
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}

function editExpense(index) {
    const newExpense = prompt("Edit the expense:", expenses[index].expense);
    const newPrice = prompt("Edit the price:", expenses[index].price);
    const newType = prompt("Edit the type:", expenses[index].type);

    expenses[index].expense = newExpense;
    expenses[index].price = newPrice;
    expenses[index].type = newType;
    expenses[index].dateAdded = currentDate;

    updateTable();
}

updateTable()
