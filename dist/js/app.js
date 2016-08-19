var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.toString = function () {
        return "Hi I'm " + this.name + " and I'm " + this.age + " years old!";
    };
    return Person;
}());
var p = new Person("Alex", 32);
console.log(p.toString());
