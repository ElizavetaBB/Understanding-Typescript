type AddType = number | string;
type ResultFormat = 'as-string' | 'as-number';

function add(input1: AddType, input2: AddType, resultFormat: ResultFormat) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    if (resultFormat === 'as-number') {
        return +result;
    } else {
        return result.toString();
    }
    return result;
}

const numbers = add(30, 20, 'as-string');
console.log(numbers);
console.log(typeof numbers);

const strings = add("30", "20", 'as-number');
console.log(strings);
console.log(typeof strings);