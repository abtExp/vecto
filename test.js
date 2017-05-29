const { Vector,sum,product } = require("./vecto");

let vect = new Vector([20000,300,300]);
vect.arrange();
console.log(vect.array);
console.log(vect.shape);

console.log(sum(4,5));
console.log(product(2,[1,2,3]));

let vect2 = new Vector(vect.shape);
vect2.arrange([3]);


console.log(sum(vect.array,vect2.array));