export const currentDate = new Date().toLocaleDateString('en-CA');

class Expense {


    constructor(newName, newPrice, newType, newDate) {
        this.name = newName || '';
        this.price = newPrice || '';
        this.type = newType || '';
        this.date = newDate || currentDate;
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