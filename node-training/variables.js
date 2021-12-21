"use strict"
// strings
var x = "Hello";
const name = "Art";
console.log(x + name);

console.log(`She sells sea shells
on the sea shore.`);
console.log("She sells sea shells\non the sea shore.");

//numbers - int, floating point
//very simple

//undefined
var z;
console.log(z);

//reassigning
x = 2;
x = false;

//const
const ccc = 3;
// ccc = 4; //TypeError: Assignment to constant variable.

// c = 4; //in "strict mode" will be an error `ReferenceError: c is not defined`

//objects
var student = {}; //empty object
student.firstname = "Art";
student.lastname = "Shyshkin";
student.age = 38;
console.log(student);

var anotherStudent = {
    firstname: "Kate",
    lastname: "Shyshkina",
    age: 38
};
console.log(anotherStudent);
console.log(anotherStudent.firstname);
console.log(anotherStudent["lastname"]);
