class Vehicle {
    vehicleType: string;
    private carNumber: number;

    constructor(vType: string, cNumber: number) {
        this.vehicleType = vType;
        this.carNumber = cNumber;
    }

    printType(this: Vehicle) {
        console.log("Vehicle type is " + this.vehicleType);
    }

    setNumber(n1: number) {
        this.carNumber = this.calculateNumber(n1);
    }

    private calculateNumber(n: number) {
        return n + 1;
    }

    getNumber() {
        return this.carNumber;
    }
}

let my_vehicle = new Vehicle("bus", 2234);
my_vehicle.printType();
my_vehicle.setNumber(112);
console.log(my_vehicle.getNumber());

// let new_vehicle = {vehicleType: 'bus2', printType: my_vehicle.printType};
// new_vehicle.printType();

class Car {
    
    constructor(private name: string, private readonly carNumber: number) {}

    printCar() {
        console.log(`This car is ${this.name} with number ${this.carNumber}`);
    }
}

let my_car = new Car('ferrari', 2124);
my_car.printCar();