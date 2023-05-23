# Notes
Decorators usually start with a capital letter.
https://www.typescriptlang.org/docs/handbook/decorators.html

A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
```
function sealed(target) {
  // do something with 'target' ...
}

@sealed
class SealedClass
```
## Decorator Factories
If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.
```
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
```
## Decorator Composition
```
@f
@g
x
```
When composing functions f and g, the resulting composite is equivalent to f(g(x)).
## Class Decorator
A function needs only the `target` parameter.
## Property Decorators
A Property Decorator is declared just before a property declaration.

Function parameters for a property decorator - `target`, `propertyName`:
```
class Greeter {
  @getFormat
  greeting: string;
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```
## Accessor Decorators (Getters and Setters)
An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. 

A function needs `target`, `name`, `descriptor`:
```
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    // ... name - is a name of an accessor method
}

class Greeter {
    private greeting: string;

    @Log2
    set greetingSet(val: string) {
        this.greeting = val;
    }
}
```
## Method Decorators
A function needs `target`, `name` (method name), `descriptor`:
```
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    // .. name - is a name of a method
}

class Greeter {
    @Log3
    greet(startString: string) {
      return startString + this.greeting;
    }
}
```
## Parameter Decorator
A Parameter Decorator is declared just before a parameter declaration. The parameter decorator is applied to the function for a class constructor or method declaration.

A function needs `target`, `name`, `position`:
```
function Log4(target: any, name: string, position: number) {
    // ... name - function name = greet
    // ... position - ordered number of a parameter = 0
}

class Greeter {
    // Log4 runs earlier than Log3
    @Log3
    greet(@Log4 startString: string) {
      return startString + this.greeting;
    }
}
```
## Change Class in a Decorator
Доп логика: в конструктор добавляется вставка текста в HTML страницы
```
function AddTextToElement(template: string, id: string) {
    console.log("AddTextElement...");
    return function<T extends {new(...args: any[]): {name: string}}>(target: T) {
        return class extends target {
            constructor(...args: any[]) {
                super();
                console.log("Create HTML...");
                let elId = document.getElementById(id);
                if (elId) {
                    elId.innerHTML = template;
                    elId.querySelector('h2')!.textContent = this.name; // obj.name
                }
            }
        }
    }
}
```
Изначальный конструктор:
```
@AddTextToElement("<h2>Text</h2>", "test-div")
class AnotherPerson {
    name = "Helen";

    constructor() {
        console.log("Create...");
    }
}
```
## Property Descriptor
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty