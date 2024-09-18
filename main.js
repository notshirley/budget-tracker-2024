// Live reload seems to be the problem, as everytime db.json gets updated, the page reloads.

import { Expense } from "./modules/expense.js";
import { ExpenseType } from "./modules/expenseType.js";
import { ExpenseService } from "./services/expenseService.js";

const expenseService = new ExpenseService();
const expenseType = new ExpenseType();

const emptyRow = new Expense();

const expenses = await expenseService.getExpenses()
const filteredExpenses = [];

const table = document.querySelector("#expensesTable");
const filterInputBoxes = document.querySelector("#filterInputBoxes");
const headerRow = document.querySelector("#headerRow");
const expenseRow = document.querySelector("#expenseRow");

init();

function init() {
  filteredExpenses.push(...expenses);
  updateTable(filteredExpenses);

  // Create container for filter input boxes
  const tableContainer = document.querySelector(".container-fluid");
  tableContainer.parentNode.insertBefore(
    filterInputBoxes.content.cloneNode(true),
    tableContainer
  );

  attachEventListeners();
}

function updateTable() {
  table.replaceChildren();
  table.appendChild(headerRow.content.cloneNode(true));

  filteredExpenses.forEach((expense) => {
    const row = expenseRow.content.cloneNode(true);
    hydrateRow(row, expense.name, expense.price, expense.type, expense.date);
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
  if (inputBox.getAttribute("id") === "dropdown-input") {
    const validTypes = expenseType.getTypes();
    const values = inputBox.value.split(", ").map(v => v.trim());
    const isValid = values.every(value => validTypes.includes(value));

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
function attachEventListeners() {
  document.querySelector("#add-button").addEventListener("click", onClickAddButton);
  const filterInputs = document.querySelectorAll("input[id=filter-input]");
  filterInputs.forEach((filter) => {
    filter.addEventListener("input", function () {
      filterByData();
    });
  });
  table.addEventListener("click", handleTableClick);
  document.querySelector("#color-mode-button").addEventListener("click", toggleColorMode);
}

function removeRowEventListeners(row) {
  const deleteButton = row.querySelector(".delete-button");
  const editButton = row.querySelector(".edit-button");
  const saveButton = row.querySelector(".save-button");

  if (deleteButton)
    deleteButton.removeEventListener("click", onClickDeleteButton);
  if (editButton)
    editButton.removeEventListener("click", onClickEditButton);
  if (saveButton)
    saveButton.removeEventListener("click", onClickSaveButton);
}

function handleTableClick(event) {
  const target = event.target;
  if (target.closest(".delete-button")) {
    onClickDeleteButton(event);
  }
  if (target.closest(".edit-button")) {
    onClickEditButton(event);
  }
  if (target.closest(".save-button")) {
    onClickSaveButton(event);
  }
}

function onClickDeleteButton(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  deleteExpense(index);
}

function onClickEditButton(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  editExpense(index);
}

function onClickSaveButton(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  saveExpense(index);}

function onClickAddButton(index) {
  addNewExpense(index);
}

function addNewExpense() {
  expenseService.createExpense(emptyRow);
  
  const row = expenseRow.content.cloneNode(true);
  hydrateRow(row, emptyRow);
  table.appendChild(row);

  editExpense(expenses.length-1);
}

function deleteExpense(index) {
  const row = table.rows[index + 1];
  removeRowEventListeners(row);

  expenseService.deleteExpense(index);
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
function editExpense(index) {
  const row = table.rows[index+1];

  const editButton = row.querySelector(".edit-button");
  editButton.replaceWith(createSaveButton());

  const nameCell = row.querySelector("#name");
  const priceCell = row.querySelector("#price");
  const typeCell = row.querySelector("#type");
  const dateCell = row.querySelector("#date");


  createInputBox(nameCell, expenses[index].name);
  createInputBox(priceCell, expenses[index].price);
  createInputBox(typeCell, expenses[index].type);
  createInputBox(dateCell, expenses[index].date);
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
function saveExpense(index) {
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
    oldExpense: expenses[index],
    newExpense: new Expense(name, price, type, date),
  })
  hydrateRow(row, expenses[index].name, expenses[index].price, expenses[index].type, expenses[index].date
  );
}

function filterByData() {
  const filterInputs = document.querySelectorAll("#filter-input");
  const filterValues = Array.from(filterInputs).map((input) => input.value.toLowerCase());

  const [nameFilter, priceFilter, typeFilter, startDateFilter, endDateFilter] = filterValues;

  filteredExpenses.length = 0

  expenses.forEach((expense) => {
    let match = true;
    if (nameFilter && !expense.name.toLowerCase().includes(nameFilter)) match = false;
    if (priceFilter && !expense.price.toString().includes(priceFilter)) match = false;
    if (typeFilter && !expense.type.toLowerCase().includes(typeFilter)) match = false;

    if (startDateFilter) {
      const date = new Date(expense.date).toISOString().split("T")[0];

      if (endDateFilter) {
        if (!(date >= startDateFilter && date <= endDateFilter)) {
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
