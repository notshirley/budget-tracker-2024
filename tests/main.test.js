import * as main from '../main.js';

//Look into spy
jest.mock('../main.js', () => ({
    ...jest.requireActual('../main.js'), // Preserve other exports
    updateTable: jest.fn(), // Mock updateTable
    init: jest.fn()
  }));
  

describe('filterByData', () => {
  let filteredExpenses;

  beforeEach(() => {

    filteredExpenses = [];
    global.expenses = [
      { name: 'Food Expense', price: 10, type: 'Food', date: '2024-01-01' },
      { name: 'Bill Expense', price: 50, type: 'Bill', date: '2024-02-01' },
      { name: 'Entertainment Expense', price: 20, type: 'Entertainment', date: '2024-03-01' },
    ];

    document.querySelectorAll = jest.fn(() => [
      { value: 'Bill Expense' },
      { value: '' },      
      { value: 'Bill' },  
      { value: '' },     
      { value: '' },      
    ]);
  });

  it('should run filterByData', () => {
    main.filterByData();
    expect(main.filterByData()).toHaveBeenCalled();
  })

  it('should filter expenses based on name and type', () => {
    main.filterByData();

    expect(filteredExpenses.length).toBe(1);
    expect(filteredExpenses[0].name).toBe('Bill Expense');
  });
});
