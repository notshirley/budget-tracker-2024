// convert to class

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
        
    const addType = (newType) => {
      if (typeof newType === 'string' && !defaultPossibilities.has(newType)) {
        defaultPossibilities.add(newType);
      }
    };
  
    const removeType = (typeToRemove) => {
      if (defaultPossibilities.has(typeToRemove)) {
        defaultPossibilities.delete(typeToRemove);
      }
    };
  
    return {
      getAllTypes: getTypes,
      getType,
      addPossibleType: addType,
      removePossibleType: removeType
    };
  })();
  
  export default ExpenseType;
  