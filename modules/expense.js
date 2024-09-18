const currentDate = new Date().toLocaleDateString('en-CA');

class Expense {
    constructor(newName="", newPrice=0, newType="", newDate = currentDate) {
        this.name = newName
        this.price = newPrice
        this.type = newType
        this.date = newDate
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