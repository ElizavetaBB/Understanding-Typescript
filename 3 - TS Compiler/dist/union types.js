"use strict";
function add(input1, input2) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const numbers = add(30, 20);
console.log(numbers);
const strings = add("30", "20");
console.log(strings);
console.log("Try multi-files compilation");
