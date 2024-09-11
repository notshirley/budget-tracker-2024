const ExpenseType = (() => {
    
    const defaultPossibilities = new Set([
        'Food', 
        'Subscription', 
        'Bill', 
        'Entertainment', 
        'Transportation',
        'Shopping',
        'Gift',
        'Miscellaneous'
    ]);
    
    
    const getTypes = () => Array.from(defaultPossibilities);

    const getType = (selectedType) => {
      return getTypes().find(type => type.toLowerCase() === selectedType.toLowerCase())
    }
        
    const addPossibleType = (newType) => {
      if (typeof newType === 'string' && !defaultPossibilities.has(newType)) {
        defaultPossibilities.add(newType);
      }
    };
  
    const removePossibleType = (typeToRemove) => {
      if (defaultPossibilities.has(typeToRemove)) {
        defaultPossibilities.delete(typeToRemove);
      }
    };
  
    return {
      getTypes,
      getType,
      addType: addPossibleType,
      removeType: removePossibleType
    };
  })();
  
  export default ExpenseType;
  