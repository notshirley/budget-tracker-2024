document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    let spendings = {
        s1: {
            expense: "Groceries",
            price: 50,
            type: "food",
            dateAdded: new Date().toLocaleDateString()
        },
        s2: {
            expense: "Gas",
            price: 30,
            type: "bill",
            dateAdded: new Date().toLocaleDateString()
        },
        s3: {
            expense: "Dinner",
            price: 60,
            type: "food",
            dateAdded: new Date().toLocaleDateString()
        }
    };

    var table = document.querySelector('#spendingsTable');
    console.log('Table selected:', table);

    Object.values(spendings).forEach(function(spending) {
        var row = document.createElement('tr');

        var buttonsCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="material-icons table-button">delete</i>';
        var editButton = document.createElement('button');
        editButton.innerHTML = '<i class="material-icons table-button">edit</i>';

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
    addRow.appendChild(addButton);
    table.appendChild(addRow);

    console.log('Spendings appended');
});
