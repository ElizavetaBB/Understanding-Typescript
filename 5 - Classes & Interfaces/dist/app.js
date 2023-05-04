"use strict";
// custom type
let teacher;
teacher = {
    name: 'teacher',
    salary: 20300,
    raiseSalary(bonuses) {
        this.salary += bonuses;
    }
};
teacher.raiseSalary(1000);
console.log(`Teacher salary is ${teacher.salary}`);
// implementation in class
class Teacher {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.age = 25;
    }
    raiseSalary(bonuses) {
        this.salary += bonuses;
    }
    getAge() {
        return this.age;
    }
}
let teacherClass; // but there won't be a method getAge
teacherClass = new Teacher('teacher', 2010);
teacherClass.raiseSalary(100);
console.log(`TeacherClass salary is ${teacherClass.salary}`);
class Builder {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    raiseSalary(bonuses) {
        this.salary += bonuses;
    }
}
let func;
func = (part1, part2) => { return part1 * part2; };
console.log("Function type is " + (func(2, 4)));
//# sourceMappingURL=app.js.map