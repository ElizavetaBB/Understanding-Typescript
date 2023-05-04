"use strict";
class Vehicle {
    constructor(vType, cNumber) {
        this.vehicleType = vType;
        this.carNumber = cNumber;
    }
    setNumber(n1) {
        this.carNumber = this.calculateNumber(n1);
    }
    calculateNumber(n) {
        return n + 1;
    }
    getNumber() {
        return this.carNumber;
    }
    static createVehicle(type, cNumber) {
        return { type: type, cNumber: cNumber };
    }
}
Vehicle.steeringWheel = true;
// let my_vehicle = new Vehicle("bus", 2234);
// my_vehicle.printType();
// my_vehicle.setNumber(112);
// console.log(my_vehicle.getNumber());
// let new_vehicle = {vehicleType: 'bus2', printType: my_vehicle.printType};
// new_vehicle.printType();
class Car {
    constructor(name, carNumber) {
        this.name = name;
        this.carNumber = carNumber;
    }
    printCar() {
        console.log(`This car is ${this.name} with number ${this.carNumber}`);
    }
}
let my_car = new Car('ferrari', 2124);
my_car.printCar();
class Bike extends Vehicle {
    constructor(vType, cNumber, owner) {
        super(vType, cNumber);
        this.owner = owner;
    }
    printOwner() {
        console.log(`Owner is ${this.owner}`);
    }
    get bikeOwner() {
        return this.owner;
    }
    set bikeOwner(name) {
        this.owner = name;
    }
    // Overriding
    printType() {
        console.log(`Bike is ${this.vehicleType}`); // vehicleType is protected
    }
}
let my_bike = new Bike('bike', 22, 'Mike');
my_bike.printOwner();
my_bike.bikeOwner = 'Andrey';
my_bike.printOwner();
my_bike.printType();
// Static fields
console.log(Vehicle.createVehicle('truck', 1200));
console.log(Vehicle.steeringWheel);
class SingletoneClass {
    constructor(name) {
        this.name = name;
    }
    static getInstance() {
        if (SingletoneClass.instance) {
            return SingletoneClass.instance;
        }
        else {
            SingletoneClass.instance = new SingletoneClass('test-name');
            return SingletoneClass.instance;
        }
    }
    get nameValue() {
        return this.name;
    }
}
let firstVal = SingletoneClass.getInstance();
let secondVal = SingletoneClass.getInstance();
console.log(firstVal);
console.log(secondVal);
//# sourceMappingURL=classes.js.map