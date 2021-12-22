let arr = [10, 20, 30, 40];
let [num1, num2] = arr;

console.log(num1);
console.log(num2);

let [num11, num12, , num14, num15 = 0] = arr;

console.log(num11);
console.log(num14);
console.log(num15);

let arr2 = [10, 20, 30, 40, 50, 60, 70, 80];

let [num21, num22, , num24, num25 = 0, ...other] = arr2;
console.log(num25);
console.log(other);