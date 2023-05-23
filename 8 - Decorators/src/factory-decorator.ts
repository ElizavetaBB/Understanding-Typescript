function LoggerNew(logString: string) {
    console.log("LoggerNew");
    return function(target: Function) {
        console.log(logString);
        console.log(target);
    };
}

@LoggerNew('Logging PersonNew')
class PersonNew {
    name = "Max";

    constructor() {
        console.log("Creating person object...");
    }
}

// changing a class
function AddTextToElement(template: string, id: string) {
    console.log("AddTextElement...");
    return function<T extends {new(...args: any[]): {name: string}}>(target: T) {
        return class extends target {
            constructor(...args: any[]) {
                super();
                console.log("Create HTML...");
                let elId = document.getElementById(id);
                // let obj = new target();
                if (elId) {
                    elId.innerHTML = template;
                    elId.querySelector('h2')!.textContent = this.name; // obj.name
                }
            }
        }
    }
}

@LoggerNew('Add on Logger')
@AddTextToElement("<h2>Text</h2>", "test-div")
class AnotherPerson {
    name = "Helen";

    constructor() {
        console.log("Create...");
    }
}

function Log(target: any, propertyName: string) {
    console.log("Property decorator");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string, position: number) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

function Autobind(target: any, functionName: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    let adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // 'this' refers to the object on which we defined the getter
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

class Greeter {
    @Log
    private greeting: string;

    @Log2
    set greetingSet(val: string) {
        this.greeting = val;
    }

    constructor(message: string) {
      this.greeting = message;
    }
   
    @Log3
    greet(anotherString: string, @Log4 startString: string) {
      console.log(startString + this.greeting);
    }

    @Autobind
    sayHi() {
        console.log(this.greeting);
    }
}

let greater = new Greeter("Caterine");

let myButton = document.querySelector("button")!;
myButton.addEventListener("click", greater.sayHi);