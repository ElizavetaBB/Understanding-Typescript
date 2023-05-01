let nonBlockresult = 5;
{
    let blockResult = 3;
}

//console.log(blockResult);
console.log(nonBlockresult);

const addfunc = (a: number, b: number = 3) => a + b;
console.log(addfunc(20, 30));

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

// Spread operator ...
const firstArray = [1, 2, 3];
const secondArray = firstArray;

secondArray.push(4);

console.log("First array was changed - " + firstArray[3]);

const srcArray = [1, 2, 3];
const distArray = [...srcArray];

distArray.push(4);

console.log("Source array - " + srcArray);
console.log("Dist array - " + distArray);

// Rest parameters
const addInfinite = (...numbers: number[]) => {
    return numbers.reduce((result, value) => result + value, 0);
};

console.log("Result sum = " + addInfinite(1, 20, 90, 3, 2));

// Destructuring
let srcArray2 = [1, 2, 4, 7, 8];
let [firstVal, secondval, restVals] = srcArray2;

console.log("First val = " + firstVal + ", second val = " + secondval + ", source array = " + srcArray2);

let pet = {
    name: 'Kitty',
    type: 'cat'
}
let {name: petName, type} = pet;

console.log("New pat = " + petName + " " + type);
console.log(pet);