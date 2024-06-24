class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log("Hello, my name is " + this.name);
    }
}


Person.prototype.greet = function() {
    console.log("Hello");
};

const alice = new Person("Alice");
 // "Hello, my name is Alice"



// for (let prop in alice) {
//     console.log(prop); 
//     // name
//     // age
//     // greet
// }


console.log(Reflect.ownKeys(alice)); 