/* test file for Ndime.js */
import Vector from './helper/Ndime';

function test_creation(obj){
	console.log("[" + obj.array + "], [" + obj.shape + "], " + obj.size + ", " + obj.dim);
}


function test_func(){
	/* test sum(prop) function */
	console.log(new_vector_2.sum());

	/* test Sum(class) function */
	var arr = Vector.Sum(new_vector_2,new_vector_2);
	arr.forEach((elem)=>{console.log("1 " + elem);});

	/* test prod method  */
	var arr2 = new_vector_3.prod(new_vector_2);
	arr2.forEach((elem)=>{console.log("2" + elem);});
	var arr3 = new_vector_2.prod(5);
	arr3.forEach((elems)=>{console.log("3" + elems);});

	/* test flat method */
	new_vector_2.flat.forEach((elem)=>{console.log("4" + elem);});

	/* test fill and arrange methods */
	var nv = new Vector();
	nv.arrange([1,2,3,4,5,6]);/*error shape is 0 */
	console.log("*1 : " + nv.shape + " " +  nv.array.length);
	nv.array.forEach((i)=>{console.log("*1 : " + i);});
	var nv2 = new Vector([2,3]);
	nv2.arrange([1,2,3,4,5,6]); /*correct */
	console.log("*2 : " + nv2.shape + " " + nv2.array.length);
	nv2.array.forEach((i)=>{console.log("*2 : " + i);});
	var nv3 = new Vector([2,3]); /*correct */
	nv3.arrange([1]);
	console.log("*3 : " + nv3.shape + " " + nv3.array.length);
	nv3.array.forEach((i)=>{console.log("*3 : " + i);});
	var nv4 = new Vector([3]);
	nv4.arrange();/* correct but the array length displayed is wrong */
	console.log("*4 : " + nv4.shape + " " + nv4.array.length);
	nv4.array.forEach((i)=>{console.log("*4 : " + i);});
	var nv5 = new Vector([5]);
	nv5.arrange([1,2,3,4,5,6,7,8,9,10]); /* correct */
	console.log("*5 : " + nv5.shape + nv5.array.length);
	nv5.array.forEach((i)=>{console.log("*5 : " + i);});

}
/* test cases : */

var new_vector_1 = new Vector([2,3,4]);
test_creation(new_vector_1);
var new_vector_2 = Vector.array([[[2,3,4],[1,5,7]],[[3,4,9],[0,6,8]]]);
test_creation(new_vector_2);
var new_vector_3= new Vector([2,3],[[1,3,4],[2,5,7],[0,8,9]]);
test_creation(new_vector_3);
var new_vector_4 = Vector.zeroes([2,2,3]);
test_creation(new_vector_4);

/* testing other functions */
test_func();