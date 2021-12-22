//rest parameter
function add(...a) {
    let sum = 0;
    a.forEach(el => sum += el)
    return sum;
}

console.log(add(2, 3, 4, 5, 6));

function anotherAdd(a, ...b) {
    let sum = a;
    b.forEach(el => sum += el)
    return sum;
}

console.log(anotherAdd(2, 3, 4, 5, 6));

//spread operator
let arr = [1, 2, 3, 4];
console.log(add(...arr));

// let arr2 = [...arr];
let arr2 = [100, 200, ...arr, 300, 400];
console.log(arr2);
