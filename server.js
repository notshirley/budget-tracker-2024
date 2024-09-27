import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import { Expense } from "./modules/expense.js";

const app = express();
app.use(cors({
  origin: '*', 
}));
app.use(express.json());

const defaultData = { 
  expenses: [
    new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12"),
    new Expense("Gas", 30, 'Bill', "2024-08-03"),
    new Expense("Dinner", 60, 'Food', "2024-08-05"),
    new Expense("Clothes", 120, 'Shopping', "2024-07-03"),
    new Expense("Game", 11.99, 'Shopping', "2024-10-22"),
  ] 
};

await initiateServer();

async function initiateServer() {
const db = await JSONFilePreset('db.json', defaultData);

  const { expenses } = db.data;

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post(
    '/expenses',
    asyncHandler(async (req, res) => {
      const post = req.body;
      await db.update(({ expenses }) => expenses.push(post));
      res.send(post);
    }),
  );

  app.delete(
    '/expenses',
    asyncHandler(async (req, res) => {
      const { name, price, type, date } = req.body;
  
      const index = expenses.findIndex(
        (expense) =>
          expense.name === name &&
          expense.price === price &&
          expense.type === type &&
          expense.date === date
      );
  
      if (index !== -1) {
        const removedExpense = expenses.splice(index, 1);
        await db.update(({ expenses }) => expenses);
        res.send(removedExpense[0]);
      } else {
        res.status(404).send({ message: 'Expense not found' });
      }
    })
  );

  app.put(
    '/expenses',
    asyncHandler(async (req, res) => {
      const { oldExpense, newExpense } = req.body;

      const index = expenses.findIndex((expense) =>
        expense.name === oldExpense.name &&
        expense.price === oldExpense.price &&
        expense.type === oldExpense.type &&
        expense.date === oldExpense.date
      )

      
      if (index !== -1) {
        expenses[index] = new Expense(
          newExpense.name,
          newExpense.price,
          newExpense.type,
          newExpense.date
        );
        await db.update(({ expenses }) => expenses);
        res.send(expenses[index]);
      } else {
        res.status(404).send({ message: 'Expense not found' });
      }
    })
  );
  

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}