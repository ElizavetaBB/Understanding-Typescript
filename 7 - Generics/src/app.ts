let names: Array<string> = ['Max', "Manuel"];

function mergeObj<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign({}, objA, objB);
}

let ourObj = mergeObj({name: 'Max'}, {age: 90});
console.log(ourObj);

function anotherFunc<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Here is ' + obj[key];
}

console.log(anotherFunc({name: "lalala", age: 2023}, 'name'));