import { RouteService } from '../services/routeService.js';

const route = new RouteService();

class ExpenseService {
  getExpenses = async () => {
  try {
    const response = await fetch(`${route.main}`);
    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
  };
  
  createExpense = async (postData) => {
    try {
      const response = await fetch(`${route.main}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const newExpense = await response.json();
      return newExpense;
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  deleteExpense = async (postData) => {
    try {
      const response = await fetch(`${route.main}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      const deletedExpense = await response.json();
      return deletedExpense;
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  
  editExpense = async (postData) => {
    try {
      const response = await fetch(`${route.main}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData) 
      });
      const updatedExpense = await response.json();
      return updatedExpense;
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };
}

export {ExpenseService};

// const createExpenseParameterExample = new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12");
// const deleteExpenseParameterExample = new Expense("Groceries", 50, 'Food, Bill, Subscription', "2024-07-12");
// const eeditExpenseParameterExample = {
//   oldExpense: new Expense("Gas", 30, 'Bill', "2024-08-03"),
//   newExpense: new Expense("EDITED", 50, 'EDITED', "2024-07-12")
// };
