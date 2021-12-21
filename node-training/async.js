//synchronous manner
function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

//asynchronous manner
function addAsync(a, b, callback) {
    callback(a + b);
}

function print(c) {
    console.log(c);
}

addAsync(1, 2, print);

//inline
addAsync(1, 2, function (c) {
    console.log(c);
});

//inline arrow function
addAsync(1, 2, c => console.log(c));

