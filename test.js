const { Vector,sum,product } = require("./vecto");

let vect = new Vector([2,3,3]);
vect.arrange();
console.log(vect.array);

console.log(sum(4,5));
console.log(product(2,[1,2,3]));