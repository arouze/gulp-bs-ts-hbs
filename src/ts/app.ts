class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `Hi I'm ${this.name} and I'm ${this.age} years old!`;
    }
}

let p = new Person("Alex", 32);
console.log(p.toString());
