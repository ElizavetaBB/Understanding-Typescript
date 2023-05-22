interface MyWorker {
    [index: string]: string;
}

let myWorker: MyWorker = {
    name: 'Alice',
    profession: 'Teacher'
}

console.log(`Index property`);
console.log(myWorker);