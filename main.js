console.log('DOM fully loaded and parsed');

const currentDate = new Date().toLocaleDateString()

let spendings = [
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
    var table = document.querySelector('#spendingsTable');
    table.innerHTML = '';

    var headerRow = document.createElement('tr');
    var actionsHeader = document.createElement('th');
    actionsHeader.textContent = 'Actions';
    headerRow.appendChild(actionsHeader);

    var expenseHeader = document.createElement('th');
    expenseHeader.textContent = 'Expense';
    headerRow.appendChild(expenseHeader);

    var priceHeader = document.createElement('th');
    priceHeader.textContent = 'Price';
    headerRow.appendChild(priceHeader);

    var typeHeader = document.createElement('th');
    typeHeader.textContent = 'Type';
    headerRow.appendChild(typeHeader);

    var dateAddedHeader = document.createElement('th');
    dateAddedHeader.textContent = 'Date Added';
    headerRow.appendChild(dateAddedHeader);

    table.appendChild(headerRow);
    
    spendings.forEach((spending, index) => {
        var row = document.createElement('tr');
    
        var buttonsCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="material-icons table-button">delete</i>';
        deleteButton.onclick = function() {
            removeExpense(index);
        };

        var editButton = document.createElement('button');
        editButton.innerHTML = '<i class="material-icons table-button">edit</i>';
        editButton.onclick = function() {
            editExpense(index);
        };
    
        buttonsCell.appendChild(deleteButton);
        buttonsCell.appendChild(editButton);
    
        row.appendChild(buttonsCell);
        
        var expenseCell = document.createElement('td');
        expenseCell.textContent = spending.expense;
        row.appendChild(expenseCell);
    
        var priceCell = document.createElement('td');
        priceCell.textContent = spending.price;
        row.appendChild(priceCell);
    
        var typeCell = document.createElement('td');
        typeCell.textContent = spending.type;
        row.appendChild(typeCell);
    
        var dateAddedCell = document.createElement('td');
        dateAddedCell.textContent = spending.dateAdded;
        row.appendChild(dateAddedCell);
        
        table.appendChild(row);
    });

    var addRow = document.createElement('tr');
    var addButton = document.createElement('button');
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
        spendings.push({
            expense: newExpense, 
            price: newPrice, 
            type: newType, 
            dateAdded: currentDate
        })
        updateTable()
    }
}

function removeExpense(index) {
    spendings.splice(index, 1);
    updateTable();
}

function editExpense(index) {
    const newExpense = prompt("Edit the expense:", spendings[index].expense);
    const newPrice = prompt("Edit the price:", spendings[index].price);
    const newType = prompt("Edit the type:", spendings[index].type);

    spendings[index].expense = newExpense;
    spendings[index].price = newPrice;
    spendings[index].type = newType;
    spendings[index].dateAdded = currentDate;

    updateTable();
}

updateTable()
