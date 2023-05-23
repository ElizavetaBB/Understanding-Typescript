function Logger(target: Function) {
    console.log('Logging...');
    console.log(target);
}

@Logger
class Person {
    name = "Sam";

    constructor() {
        console.log("Creating person object...");
    }
}