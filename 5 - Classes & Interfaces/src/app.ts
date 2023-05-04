abstract class Vehicle {
    static steeringWheel = true;
    protected vehicleType: string;
    private carNumber: number;

    constructor(vType: string, cNumber: number) {
        this.vehicleType = vType;
        this.carNumber = cNumber;
    }

    abstract printType(): void;

    setNumber(n1: number) {
        this.carNumber = this.calculateNumber(n1);
    }

    private calculateNumber(n: number) {
        return n + 1;
    }

    getNumber() {
        return this.carNumber;
    }

    static createVehicle(type: string, cNumber: number) {
        return {type: type, cNumber: cNumber};
    }
}

// let my_vehicle = new Vehicle("bus", 2234);
// my_vehicle.printType();
// my_vehicle.setNumber(112);
// console.log(my_vehicle.getNumber());

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

class Bike extends Vehicle {
    constructor(vType: string, cNumber: number, private owner: string) {
        super(vType, cNumber);
    }

    printOwner() {
        console.log(`Owner is ${this.owner}`);
    }

    public get bikeOwner() {
        return this.owner;
    }

    public set bikeOwner(name: string) {
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
    private static instance: SingletoneClass;
    private constructor(private name: string) {}

    public static getInstance() {
        if (SingletoneClass.instance) {
            return SingletoneClass.instance;
        } else {
            SingletoneClass.instance = new SingletoneClass('test-name');
            return SingletoneClass.instance;
        }
    }

    public get nameValue() {
        return this.name;
    }
}

let firstVal = SingletoneClass.getInstance();
let secondVal = SingletoneClass.getInstance();
console.log(firstVal);
console.log(secondVal);