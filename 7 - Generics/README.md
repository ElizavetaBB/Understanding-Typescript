# Notes
## Documentation 
https://www.typescriptlang.org/docs/handbook/2/generics.html
## Generic Constraints
Use `extends` to set a parent type
```
function mergeObj<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign({}, objA, objB);
}
```
## keyOf constraint
`keyOf` makes sure, that a property exists in an object.
```
function anotherFunc<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Here is ' + obj[key];
}

anotherFunc({age: 2023}, 'name'); // throw an error
```
## Generic Class
https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes
## Generic Utility Types
https://www.typescriptlang.org/docs/handbook/utility-types.html