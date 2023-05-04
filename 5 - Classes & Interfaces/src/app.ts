interface Profession {
    name: string;
    salary: number;

    raiseSalary(bonuses: number): void;
}

// custom type
let teacher: Profession;
teacher = {
    name: 'teacher',
    salary: 20300,
    raiseSalary(bonuses: number) {
        this.salary += bonuses;
    }
}
teacher.raiseSalary(1000);
console.log(`Teacher salary is ${teacher.salary}`);

// implementation in class
class Teacher implements Profession {
    private age = 25;
    constructor(public name: string, public salary: number) {}

    raiseSalary(bonuses: number): void {
        this.salary += bonuses;
    }

    getAge() {
        return this.age;
    }
}

let teacherClass: Profession; // but there won't be a method getAge

teacherClass = new Teacher('teacher', 2010);
teacherClass.raiseSalary(100);
console.log(`TeacherClass salary is ${teacherClass.salary}`);

// Interface inheritance
interface Named {
    readonly name: string;
    lastname?: string;
}

interface Salaried extends Named { // extends Named, Salaried, Profession,...
    salary: number;

    raiseSalary(bonuses: number): void;
}

class Builder implements Salaried { // doesn't have lastname!
    constructor(public name: string, public salary: number) {}

    raiseSalary(bonuses: number) {
        this.salary += bonuses;
    }
}

// Interface as a Function type
interface MyFunc {
    (par1: number, par2: number): number;
}
let func: MyFunc;
func = (part1: number, part2: number) => {return part1 * part2};

console.log("Function type is " + (func(2, 4)));