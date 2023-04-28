enum Pet {
    DOG = "DOG",
    CAT = "CAT",
    PARROT = "PERROT"
};

const person: {
    name: string;
    age: number;
    appearance: {
        eyeColor: string;
    }
    hobbies: string[],
    pet: [Pet, string]
} = {
    name: "Liza",
    age: 22,
    appearance: {
        eyeColor: "blue"
    },
    hobbies: ["reading", "writing"],
    pet: [Pet.DOG, "Bullet"]
};

console.log(person.appearance.eyeColor);
console.log(person.pet);

let numbers: (string | number)[];
numbers = ['one', 1, 'two', 10];

console.log(numbers);

