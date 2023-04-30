function add(n1: number, n2: number): number {
    return n1 + n2;
}

console.log(add(20, 30));

function printNumber(n: number): void {
    console.log("Our number " + n);
}

printNumber(1024);

let newFunc: (n1: number, n2: number) => number;
newFunc = add;

console.log(newFunc(20, 40));