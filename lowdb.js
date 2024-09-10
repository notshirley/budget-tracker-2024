// import { Low } from 'lowdb';
// import { JSONFile } from 'lowdb/node';
// import { Expense } from './modules/expense.js';
// import Type from './modules/type.js';

// const adapter = new JSONFile('db.json');

// const initialExpenses = [
//   new Expense("Groceries", 50, Type.getType("food"), "2024-07-12"),
//   new Expense("Gas", 30, Type.getType("bill"), "2024-08-03"),
//   new Expense("Dinner", 60, Type.getType("food"), "2024-08-05"),
//   new Expense("Clothes", 120, Type.getType("shopping"), "2024-07-03"),
//   new Expense("Game", 11.99, Type.getType("shopping"), "2024-10-22"),
// ];

// const db = new Low(adapter, {expenses: []});

// for (const expense of initialExpenses) {
//   db.data.expenses.push(expense);
// }

// await db.write();

// export { db };
