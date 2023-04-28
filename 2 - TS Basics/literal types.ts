function add(input1: number | string, input2: number | string, resultFormat: 'as-string' | 'as-number') {
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