let student = {
    firstname: "Art",
    lastname: "Shyshkin",
    age: 38,
    hobbies: ['programming', '3d printing', 'travelling'],
    email: 'd.art.shishkin@gmail.com',
    website: 'shyshkin.net'
};

// let lastname = student.lastname;
// let firstname = student.firstname;
let {firstname, lastname} = student;

console.log(firstname);
console.log(lastname);

let {firstname: fName, lastname: ln, nickname} = student;

console.log(fName);
console.log(ln);
console.log(nickname);  //undefined


let {firstname: fName2, lastname: lName2, nickname2 = 'Not provided'} = student;

console.log(fName2);
console.log(lName2);
console.log(nickname2);


//with rest parameter
let {firstname: fName3, lastname: lName3, nickname: nName3 = 'Not provided', ...details} = student;

console.log(fName3);
console.log(lName3);
console.log(nName3);
console.log(details);


