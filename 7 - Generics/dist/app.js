"use strict";
let names = ['Max', "Manuel"];
function mergeObj(objA, objB) {
    return Object.assign({}, objA, objB);
}
let ourObj = mergeObj({ name: 'Max' }, { age: 90 });
console.log(ourObj);
function anotherFunc(obj, key) {
    return 'Here is ' + obj[key];
}
console.log(anotherFunc({ name: "lalala", age: 2023 }, 'name'));
