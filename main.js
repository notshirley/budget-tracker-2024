/*

*/

import { Expense } from "./modules/expense.js";
import Type from "./modules/type.js";

const emptyRow = new Expense();

const expenses = [
  new Expense("Groceries", 50, Type.getType("food"), "2024-07-12"),
  new Expense("Gas", 30, Type.getType("bill"), "2024-08-03"),
  new Expense("Dinner", 60, Type.getType("food"), "2024-08-05"),
  new Expense("Clothes", 120, Type.getType("shopping"), "2024-07-03"),
  new Expense("Game", 11.99, Type.getType("shopping"), "2024-10-22"),
];

let filteredExpenses = [];

const table = document.querySelector("#expensesTable");
const filterInputBoxes = document.querySelector("#filterInputBoxes");
const headerRow = document.querySelector("#headerRow");
const expenseRow = document.querySelector("#expenseRow");

init();

function init() {
  filteredExpenses = expenses;
  updateTable();

  const tableContainer = document.querySelector(".container-fluid");
  tableContainer.parentNode.insertBefore(
    filterInputBoxes.content.cloneNode(true),
    tableContainer
  );

  // console.log(filterInputBoxes.content.cloneNode(true))
  // tableContainer.insertAdjacentHTML("beforebegin", filterInputBoxes.content.cloneNode(true).content)

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
  row.querySelector("td[id=name]").textContent = name;
  row.querySelector("td[id=price]").textContent = price;
  row.querySelector("td[id=type]").textContent = type;
  row.querySelector("td[id=date]").textContent = date;
}

function addEmptyRow() {
  const row = expenseRow.content.cloneNode(true);
  hydrateRow(row, emptyRow);
  table.appendChild(row);
}

function updateExpenses(index, name, price, type, date) {
  expenses[index].name = name;
  expenses[index].price = price;
  expenses[index].type = type;
  expenses[index].date = date;
}

function validateInputEvent(inputBox) {
  if (!inputBox.checkValidity()) {
    inputBox.classList.add("is-invalid");
  } else {
    inputBox.classList.remove("is-invalid");
  }
}

function createInputBox(cell, data) {
  const inputBox = document.createElement("input");
  const cellId = cell.getAttribute("id");
  inputBox.classList.add("form-control");
  inputBox.required = true;
  cell.replaceChildren();
  
  if (cellId === "date") {
    inputBox.type = "date";
  } else if (cellId === "price") {
    inputBox.type = "number";
    inputBox.step = "0.01";
  } else if (cellId === "type") {
    //TODO
  } else {
    inputBox.type = "text";
  }
  inputBox.value = data;
  if (!inputBox.value) inputBox.classList.add("is-invalid");

  inputBox.addEventListener("input", function () {
    validateInputEvent(inputBox);
  });
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
  expenses.push({ ...emptyRow });
  addEmptyRow();
  editExpense(expenses.length - 1);
}

function deleteExpense(index) {
  const row = table.rows[index + 1];
  removeRowEventListeners(row);

  expenses.splice(index, 1);
  updateTable();
}

function editExpense(index) {
  const row = table.rows[index + 1];

  const editButton = row.querySelector(".edit-button");
  editButton.replaceWith(createSaveButton());

  const nameCell = row.querySelector("td[id=name]");
  const priceCell = row.querySelector("td[id=price]");
  const typeCell = row.querySelector("td[id=type]");
  const dateCell = row.querySelector("td[id=date]");

  createInputBox(nameCell, expenses[index].name);
  createInputBox(priceCell, expenses[index].price);
  createInputBox(typeCell, expenses[index].type);
  createInputBox(dateCell, expenses[index].date);
}

function saveExpense(index) {
  const row = table.rows[index + 1];

  const nameInput = row.querySelector("td[id=name] input");
  const priceInput = row.querySelector("td[id=price] input");
  const typeInput = row.querySelector("td[id=type] input");
  const dateInput = row.querySelector("td[id=date] input");

  const name = nameInput.value.trim();
  const price = priceInput.value;
  const type = typeInput.value;
  const date = dateInput.value;

  if (
    !validateInput(nameInput) ||
    !validateInput(priceInput) ||
    !validateInput(typeInput) ||
    !validateInput(dateInput)
  ) {
    return;
  }

  const saveButton = row.querySelector(".save-button");
  saveButton.replaceWith(createEditButton());

  updateExpenses(index, name, price, type, date);
  hydrateRow(
    row,
    expenses[index].name,
    expenses[index].price,
    expenses[index].type,
    expenses[index].date
  );
}

function validateInput(input) {
  return input.checkValidity();
}

function attachEventListeners() {
  document
    .querySelector("#add-button")
    .addEventListener("click", onClickAddButton);

  const filterInputs = document.querySelectorAll("input[id=filter-input]");
  filterInputs.forEach((filter) => {
    filter.addEventListener("input", function () {
      // filterTableHtmlTable();
      filterByData();
    });
  });

  table.addEventListener("click", handleTableClick);

  document
    .querySelector("#color-mode-button")
    .addEventListener("click", toggleColorMode);
}

function handleTableClick(event) {
  const target = event.target;
  if (target.closest(".delete-button")) {
    handleDeleteButtonClick(event);
  }
  if (target.closest(".edit-button")) {
    handleEditButtonClick(event);
  }
  if (target.closest(".save-button")) {
    handleSaveButtonClick(event);
  }
}

function handleDeleteButtonClick(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  onClickDeleteButton(index);
}

function handleEditButtonClick(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  onClickEditButton(index);
}

function handleSaveButtonClick(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1;
  onClickSaveButton(index);
}

function toggleColorMode() {
  const currentTheme = document.body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-bs-theme", newTheme);
}

function removeRowEventListeners(row) {
  const deleteButton = row.querySelector(".delete-button");
  const editButton = row.querySelector(".edit-button");
  const saveButton = row.querySelector(".save-button");

  if (deleteButton)
    deleteButton.removeEventListener("click", handleDeleteButtonClick);
  if (editButton)
    editButton.removeEventListener("click", handleEditButtonClick);
  if (saveButton)
    saveButton.removeEventListener("click", handleSaveButtonClick);
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

function createSaveButton() {
  const button = document.createElement("button");
  button.className = "btn save-button";
  button.setAttribute("id", "row-button");

  const icon = document.createElement("icon");
  icon.className = "bi bi-floppy";

  button.appendChild(icon);
  return button;
}

function filterTableHtmlTable() {
  const filterInputs = document.querySelectorAll("input[id=filter-input]");
  const filterValues = Array.from(filterInputs).map((input) =>
    input.value.toLowerCase()
  );

  const startDateInput = document.querySelector(".start-date").value;
  const endDateInput = document.querySelector(".end-date").value;

  console.time("filterByHtml");
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cells = Array.from(row.cells).slice(2);

    let match = true;

    cells.forEach((cell, index) => {
      if (startDateInput && cell.getAttribute("id") === "date") {
        const dateValue = new Date(cell.textContent)
          .toISOString()
          .split("T")[0];

        if (endDateInput) {
          if (!(dateValue >= startDateInput && dateValue <= endDateInput)) {
            match = false;
          }
        } else {
          if (dateValue !== startDateInput) {
            match = false;
          }
        }
      } else {
        if (
          cell.textContent.toLowerCase().indexOf(filterValues[index]) === -1
        ) {
          match = false;
        }
      }
    });

    row.style.display = match ? "" : "none";
  }
  console.timeEnd("filterByHtml");
}

// Filtering by data set
function filterByData() {
  const filterInputs = document.querySelectorAll("input[id=filter-input]");
  const filterValues = Array.from(filterInputs).map((input) =>
    input.value.toLowerCase()
  );

  const [nameFilter, priceFilter, typeFilter, startDateFilter, endDateFilter] =
    filterValues;

  filteredExpenses = [];

  // Tracking performance in a code block
  console.time("filterByData");
  expenses.forEach((expense) => {
    let match = true;

    if (nameFilter && !expense.name.toLowerCase().includes(nameFilter))
      match = false;
    if (priceFilter && !expense.price.toString().includes(priceFilter))
      match = false;
    if (typeFilter && !expense.type.toLowerCase().includes(typeFilter))
      match = false;

    if (startDateFilter) {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0];

      if (endDateFilter) {
        if (!(expenseDate >= startDateFilter && expenseDate <= endDateFilter)) {
          match = false;
        }
      } else {
        if (expenseDate !== startDateFilter) {
          match = false;
        }
      }
    }

    if (match) {
      filteredExpenses.push(expense);
    }
  });
  console.timeEnd("filterByData");

  updateTable();
}
