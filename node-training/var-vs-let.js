//var vs let

//var
var a = 10;
if (true) {
    var a = 20;
    console.log(a);
}
console.log(a);

//let - limits scope of the variable
let b = 10;
if (true) {
    let b = 20;
    console.log(b);
}
console.log(b);

