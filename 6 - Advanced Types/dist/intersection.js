"use strict";
let testVal = {
    name: "test",
    value: 2,
    distances: [10, 2]
};
console.log(testVal);
function printValue(el) {
    if ('value' in el) {
        console.log(`Value is ${el.value}`);
    }
    if ('distances' in el) {
        console.log(`Distances are ${el.distances}`);
    }
}
let testVal2 = {
    name: "test",
    distances: [2, 7]
};
printValue(testVal2);
