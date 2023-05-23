"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function LoggerNew(logString) {
    console.log("LoggerNew");
    return function (target) {
        console.log(logString);
        console.log(target);
    };
}
let PersonNew = class PersonNew {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
PersonNew = __decorate([
    LoggerNew('Logging PersonNew')
], PersonNew);
// changing a class
function AddTextToElement(template, id) {
    console.log("AddTextElement...");
    return function (target) {
        return class extends target {
            constructor(...args) {
                super();
                console.log("Create HTML...");
                let elId = document.getElementById(id);
                // let obj = new target();
                if (elId) {
                    elId.innerHTML = template;
                    elId.querySelector('h2').textContent = this.name; // obj.name
                }
            }
        };
    };
}
let AnotherPerson = class AnotherPerson {
    constructor() {
        this.name = "Helen";
        console.log("Create...");
    }
};
AnotherPerson = __decorate([
    LoggerNew('Add on Logger'),
    AddTextToElement("<h2>Text</h2>", "test-div")
], AnotherPerson);
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
function Autobind(target, functionName, descriptor) {
    let originalMethod = descriptor.value;
    let adjDescriptor = {
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
    set greetingSet(val) {
        this.greeting = val;
    }
    constructor(message) {
        this.greeting = message;
    }
    greet(anotherString, startString) {
        console.log(startString + this.greeting);
    }
    sayHi() {
        console.log(this.greeting);
    }
}
__decorate([
    Log
], Greeter.prototype, "greeting", void 0);
__decorate([
    Log2
], Greeter.prototype, "greetingSet", null);
__decorate([
    Log3,
    __param(1, Log4)
], Greeter.prototype, "greet", null);
__decorate([
    Autobind
], Greeter.prototype, "sayHi", null);
let greater = new Greeter("Caterine");
let myButton = document.querySelector("button");
myButton.addEventListener("click", greater.sayHi);
