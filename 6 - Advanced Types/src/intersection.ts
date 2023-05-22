// Code goes here!
type FirstT = {
    name: string,
    value: number
}

type SecondT = {
    name: string,
    distances: number[]
}

type ThirdT = FirstT & SecondT;

let testVal: ThirdT = {
    name: "test",
    value: 2,
    distances: [10, 2]
}

console.log(testVal);

type UnionT = FirstT | SecondT;

function printValue(el: UnionT) {
    if ('value' in el) {
        console.log(`Value is ${el.value}`);
    }
    if ('distances' in el) {
        console.log(`Distances are ${el.distances}`);
    }
}

let testVal2: UnionT = {
    name: "test",
    distances: [2, 7]
}

printValue(testVal2);