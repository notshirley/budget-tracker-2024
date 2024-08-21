export const currentDate = new Date().toLocaleDateString();

class Expense {
    name = '';
    price = '';
    type = '';
    date = currentDate;

    constructor(newName, newPrice, newType) {
        this.name = newName || '';
        this.price = newPrice || '';
        this.type = newType || '';
        this.date = currentDate;
    }

    changeName(newName) {
        this.name = newName;
    }

    changePrice(newPrice) {
        this.price = newPrice;
    }

    changeType(newType) {
        this.type = newType;
    }

    changeDate(newDate) {
        this.date = newDate
    }
}

export { Expense }