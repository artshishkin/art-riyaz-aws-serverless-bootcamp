let i = 0;
const limit = 5;

while (i < limit) {
    console.log(i);
    i++;
}

i = 0;
do {
    console.log(++i);
} while (i < limit);

console.log("-------------fori--------------")
for (let j = 0; j < limit; j++) {
    console.log(j);
}

console.log("-------------for in--------------")
let array = ["art", "kate", "arina", "nazar"];
for (const arrayKey in array) {
    console.log(array[arrayKey]);
}

console.log("-------------for of--------------")
for (const name of array) {
    console.log(name);
}

console.log("-------------forEach-function----------")
array.forEach(function (name) {
    console.log(name);
});

console.log("-------------forEach-arrow function-------------")
array.forEach(name => console.log(name));
