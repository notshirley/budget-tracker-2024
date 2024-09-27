// Create a selector object so it's less repetitive (for like column ids)

import { Expense } from "./modules/expense.js";
import { ExpenseService } from "./services/expenseService.js";
import { ExpenseType } from "./modules/expenseType.js";

const expenseService = new ExpenseService();
const expenseType = new ExpenseType();
const emptyRow = new Expense();
let expenses = []
let filteredExpenses = [];

const table = document.querySelector("#expensesTable");
const filterInputBoxes = document.querySelector("#filterInputBoxes");
const headerRow = document.querySelector("#headerRow");
const expenseRow = document.querySelector("#expenseRow");

// init();

function getExpenses() {
  return expenseService.getExpenses()
}

async function updateExpenses() {
  expenses = await getExpenses()
  filteredExpenses = await getExpenses()
}

async function init() {
    await updateExpenses()
    updateTable();

    // Creates container for filter input boxes
    const tableContainer = document.querySelector(".container-fluid");
    tableContainer.parentNode.insertBefore(
      filterInputBoxes.content.cloneNode(true),
      tableContainer
    );

    addEventListeners();
}


function updateTable() {
  table.replaceChildren();
  table.appendChild(headerRow.content.cloneNode(true));

  filteredExpenses.forEach((expense) => {
    const {name, price, type, date} = expense
    
    const row = expenseRow.content.cloneNode(true);
    hydrateRow(row, name, price, type, date);
    table.appendChild(row);
  });
}

function hydrateRow(row, name, price, type, date) {
  row.querySelector("#name").textContent = name;
  row.querySelector("#price").textContent = price;
  row.querySelector("#type").textContent = type;
  row.querySelector("#date").textContent = date;
}

function validateInputEvent(inputBox) {
  // Makes sure dropdown inputs are valid expense types.
  if (inputBox.getAttribute("id") === "dropdown-input") {
    const values = inputBox.value.split(", ").map(v => v.trim());
    const isValid = values.every(value => expenseType.getTypes().includes(value));

    if (!isValid) {
      inputBox.classList.add("is-invalid");
    } else {
      inputBox.classList.remove("is-invalid");
    }
  } 
  if (!inputBox.checkValidity()) {
    inputBox.classList.add("is-invalid");
  } else {
    inputBox.classList.remove("is-invalid");
  }
  
}

function toggleColorMode() {
  const currentTheme = document.body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-bs-theme", newTheme);
}
function addEventListeners() {
  document.querySelector("#add-button").addEventListener("click", onClickAddButton);
  const filterInputs = document.querySelectorAll("#filter-input");
  filterInputs.forEach((filter) => {
    filter.addEventListener("input", function () {
      filterByData();
    });
  });
  table.addEventListener("click", handleTableClick);
  document.querySelector("#color-mode-button").addEventListener("click", toggleColorMode);
}

// Use single table handler
function handleTableClick(event) {
  const target = event.target;
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  
  if (target.closest(".delete-button")) {
    deleteExpense(index);
  } else if (target.closest(".edit-button")) {
    editExpense(index);
  } else if (target.closest(".save-button")) {
    saveExpense(index);
  }
}

async function onClickAddButton() {
  expenseService.createExpense(emptyRow);
  await updateExpenses()
  updateTable()
  
  editExpense(table.rows.length-2);
}

async function deleteExpense(index) {
  expenseService.deleteExpense(expenses[index]);
  await updateExpenses()
  updateTable();
}

function createSaveButton() {
  const button = document.createElement("button");
  button.className = "btn save-button";
  button.setAttribute("id", "row-button");

  const icon = document.createElement("icon");
  icon.className = "bi bi-floppy";

  button.appendChild(icon);
  return button;
}

function createInputBox(cell, data) {
  const cellId = cell.getAttribute("id");
  cell.replaceChildren();

  let inputBox;

  if (cellId === "type") {
    const typeDropdownElement = document.createElement("type-dropdown");
    inputBox = typeDropdownElement.shadowRoot.querySelector("#dropdown-input");
    inputBox.value = data ? `${data},` : "";
    cell.appendChild(typeDropdownElement);
  } else {
    inputBox = document.createElement("input");
    inputBox.classList.add("form-control");
    inputBox.required = true;
    switch (cellId) {
      case "date":
        inputBox.type = "date";
        break;
      case "price":
        inputBox.type = "number";
        inputBox.step = "0.01";
        break;
      default:
        inputBox.type = "text";
    }

    inputBox.value = data;
    if (!inputBox.value) {
      inputBox.classList.add("is-invalid");
    }
    
    cell.appendChild(inputBox);
  }
  inputBox.addEventListener("input", () => validateInputEvent(inputBox));
}
async function editExpense(index) {
  const row = table.rows[index+1];
  
  const editButton = row.querySelector(".edit-button");
  editButton.replaceWith(createSaveButton());

  const nameCell = row.querySelector("#name");
  const priceCell = row.querySelector("#price");
  const typeCell = row.querySelector("#type");
  const dateCell = row.querySelector("#date");

  const {name, price, type, date} = expenses[index] ? expenses[index] : emptyRow;
  
  createInputBox(nameCell, name);
  createInputBox(priceCell, price);
  createInputBox(typeCell, type);
  createInputBox(dateCell, date);
}

function createEditButton() {
  const button = document.createElement("button");
  button.className = "btn edit-button";
  button.setAttribute("id", "row-button");

  const icon = document.createElement("icon");
  icon.className = "bi bi-pencil";

  button.appendChild(icon);
  return button;
}
function inputIsInvalid(input) {
  return input.classList.contains("is-invalid");
}
async function saveExpense(index) {
  const row = table.rows[index + 1];

  const nameInput = row.querySelector("td[id=name] input");
  const priceInput = row.querySelector("td[id=price] input");
  const typeDropdownElement = row.querySelector("type-dropdown");
  const typeInput = typeDropdownElement.shadowRoot.querySelector(
    "input[id=dropdown-input]"
  );
  const dateInput = row.querySelector("td[id=date] input");

  const name = nameInput.value.trim();
  const price = priceInput.value;
  const type = typeInput.value.trim().replace(/,+$/, "");
  const date = dateInput.value;

  if ([nameInput, priceInput, typeInput, dateInput].some(inputIsInvalid)) return;

  const saveButton = row.querySelector(".save-button");
  saveButton.replaceWith(createEditButton());

  expenseService.editExpense({
    oldExpense: expenses.length == index ? expenses[index-1] : expenses[index],
    newExpense: new Expense(name, price, type, date),
  })
  
  await updateExpenses()


  // clean up
  hydrateRow(row, expenses[index].name, expenses[index].price, expenses[index].type, expenses[index].date
  );
}

export function filterByData() {
  const filterInputs = document.querySelectorAll("#filter-input");
  const filterValues = Array.from(filterInputs).map((input) => input.value.toLowerCase());

  const [nameFilter, priceFilter, typeFilter, startDateFilter, endDateFilter] = filterValues;


  filteredExpenses.length = 0
  
  expenses.forEach((expense) => {
    const {name, price, type, date} = expense;
    let match = true;
    if (nameFilter && !name.toLowerCase().includes(nameFilter)) match = false;
    if (priceFilter && !price.toString().includes(priceFilter)) match = false;
    if (typeFilter && !type.toLowerCase().includes(typeFilter)) match = false;

    if (startDateFilter) {
      const formattedDate = new Date(date).toISOString().split("T")[0];

      if (endDateFilter) {
        if (!(formattedDate >= startDateFilter && formattedDate <= endDateFilter)) {
          match = false;
        }
      } else {
        if (date !== startDateFilter) {
          match = false;
        }
      }
    }

    if (match) {
      filteredExpenses.push(expense);
    }
  })

  updateTable();
}

export const main = {
  filterByData,
};
