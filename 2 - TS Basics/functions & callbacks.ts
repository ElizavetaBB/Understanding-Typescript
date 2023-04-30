function addAndDoSmth(n1: number, n2: number, func: (number) => void) {
    let result = n1 + n2;
    func(result);
}

addAndDoSmth(120, 30, (result) => {console.log("Result is " + result)});