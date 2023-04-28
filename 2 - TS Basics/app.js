function add(n1, n2) {
    return n1 + n2;
}
console.log(add(20, 30));
function printNumber(n) {
    console.log("Our number " + n);
}
printNumber(1024);
var newFunc;
newFunc = add;
console.log(newFunc(20, 40));
