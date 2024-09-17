import { Expense } from "./modules/expense.js";

const createExpense = async (postData) => {
    try {
      const response = await fetch('http://localhost:3000/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const post = await response.json();
      console.log('EXPENSES UPDATED');
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
const getExpenses = async () => {
try {
    const response = await fetch(`http://localhost:3000/expenses/all`);
    const post = await response.json();
    // console.log(post);
    return post;
} catch (error) {
    console.error('Error fetching post:', error);
}
};

const deleteExpense = async (postData) => {
  try {
    const response = await fetch('http://localhost:3000/deleteExpense', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const deletedExpense = await response.json();
    console.log('Deleted expense:', deletedExpense);
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};

const editExpense = async (postData) => {
  try {
    const response = await fetch('http://localhost:3000/editExpense', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData) 
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Expense edited successfully:', result);
    } else {
      console.error('Error response from server:', await response.text());
    }
  } catch (error) {
    console.error('Error editing expense:', error);
  }
};


// getExpenses()
// const expenseToAdd = new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12");
// createExpense(expenseToAdd)
// const expenseToDelete = new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12");
// deleteExpense(new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12"))

// const expenseToEdit = {
//   oldExpense: new Expense("Gas", 30, 'Bill', "2024-08-03"),
//   newExpense: new Expense("EDITED", 50, 'EDITED', "2024-07-12")
// };

// editExpense(expenseToEdit);

export {getExpenses, createExpense, deleteExpense, editExpense}