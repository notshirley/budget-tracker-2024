class ExpenseType {
    defaultPossibilities = new Set([
        'Food', 
        'Subscription', 
        'Bill', 
        'Entertainment', 
        'Transportation',
        'Shopping',
        'Gift',
        'Miscellaneous'
    ]);
    
    getTypes = () => Array.from(this.defaultPossibilities);
        
    // addType = (newType) => {
    //   if (typeof newType === 'string' && !this.defaultPossibilities.has(newType)) {
    //     this.defaultPossibilities.add(newType);
    //   }
    // };
  
    // removeType = (typeToRemove) => {
    //   if (this.defaultPossibilities.has(typeToRemove)) {
    //     this.defaultPossibilities.delete(typeToRemove);
    //   }
    // };
  };
  
  export {ExpenseType};
  