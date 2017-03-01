/* A JS library for dealing with n-dimensional vectors. 
 * Referenced from numpy.
 * 
 * Project-Name : Ndime.
 * Code-Name : numjs.
 * Version : 0.6.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */

class Vector{
	constructor(shape=[],arr=[]){
		this.array = arr;
		this.shape = ((shape.length)>0) ? shape : (this.calc_shape(this.array));
		this.size = this.calc_size(this.shape);
		this.dim = this.shape.length;
		this.flat = [];
		this.flatten(this.array);
	}
	
	/* class specific (static) methods */
    /* form a new vector for the given array */
	static array(arr){
		return new Vector([],arr);
	}

    /* make a new zero Vector */
	static zeroes(shape){
		var base_arr = this.fill(shape[shape.length-1],0);
		for(var i=shape.length-2; i>=0; i--){
			var arr = [];
			for(var j=0; j<shape[i]; j++){
				arr.push(base_arr);
			}
			base_arr = arr;
		}
		return new Vector(shape,arr);
	}

   	
   /* sum of 2 vectors */
   static add(v1,v2){
	   if(v1.shape === v2.shape){
		   var sum = [];
		   for(var i=0; i<v1.flat.length; i++){
			   sum[i] = v1.flat[i] + v2.flat[i];
		   }
		   var v = new Vector(v1.shape);
		   v.arrange(sum);
		   return v;
	   }
	   else{
		   return new Error("Unequal Size");
	   }
   }


   /* fills the vector acc to passed args */
   static fill(len, ...args){
		var arr = [];
	   	var i;
		if(!args || args.length === 0){
			for(i=0; i<len; i++){
				arr[i] = Math.random();
			}
		}
		else{
			if(args.length === 1){
				if(Array.isArray(args[0])){
					var j=0;
					for(i=0; i<len; i++){
						arr[i] = args[0][j++];
						if(j>=args[0].length){
							j=0;
						}
					}
				}
				else{
					for(i=0; i<len; i++){
						arr[i] = args[0];
					}
				}
			}
			else{
				var num = min = args[0];
				var max = args[1];
				for(i=0; i<len; i++){
					arr[i] = num++;
					if(num>max){
						num = min;
					}
				}
			}
		}
		return arr;
	}

 /* -------------------------------------------------------------------------------------------------------------------------------------------- */   
	
	/* object specific (property) methods */

	/* find the shape of the given array */
	calc_shape(arr){
		var shape = [];
		shape.push(arr.length);
		var a = arr[0];
		while(Array.isArray(a)){
			shape.push(a.length);
			a = a[0];
		}
		return shape;
	}

	/* find the size of the array */
	calc_size(shape){
		var size = 1;
		for(var i of shape){
			size *= i;
		}
		return size;
	}

	/* function to convert n-dimension array into 1-D array */

	flatten(arr){
		for(var i of arr){
			if(Array.isArray(i)){
				this.flatten(i);
			}
			else{
				this.flat.push(i);
			}
	    }
	}

   /* operations */
   sum(){
	   var sum = 0;
	   var arr = this.flat;
	   for(var i of arr){
		   sum += i;
	   }
	   return sum;
   }
   
   prod(v1){
	   var cArr = this.flat;
	   if(Array.isArray(v1)){
		   if(v1.length === cArr.length){
			   var prodc = [];
			   for(var i=0; i<cArr.length; i++){
				   prodc[i] = v1[i]*cArr[i];
			   }
			   return prodc;
		   }
		   else{
			   return new Error("Unequal length");
		   }
	   }
	   else{
		   for(var i=0; i<cArr.length; i++){
			   cArr[i] = cArr[i]*v1;
		   }
		   return cArr;
	   }
	}
    
	/* a method to arrange or create a Vector from the given elements */
	arrange(elems_arr){
		var dim = this.dim;
		var base_arr_size = this.shape[dim-1];
		var final_arr = [];
		var base_elems = 1, j=0;
		if(dim >= 2){
			base_elems = this.shape[dim-2]; 
		}
		for(var i=0; i<base_elems; i++){
			if(elems_arr){
				var part = [];
				for(var k=0; k<base_arr_size; k++){
					part[k] = elems_arr[j++];
					if(j>=elems_arr.length){
					j=0;
					}
				}
				final_arr.push(Vector.fill(base_arr_size,part));
			}
			else{
				final_arr.push(Vector.fill(base_arr_size));
			}		
		}
		this.array = final_arr;
		this.flatten(this.array);
	}

	/* reshapes the vector only if for the new shape the number of elements remain same */
	reshape(new_shape){
		if(this.calc_size(new_shape) === this.size){
			/* reshape */
			var temp_arr = this.flat;
			this.shape = new_shape;
			this.arrange(temp_arr);
		}
		else{
			return new Error("Resizing error : can't change the size");
		}
	}
	
	/* changes the shape and size of the vector in place */
	resize(new_shape){
		var temp_arr = this.flat;
		this.shape = new_shape;
		this.size = this.calc_size(this.shape);
		this.arrange(temp_arr);
	}

	/* function to find the transpose */
	transpose(){
		/* converts row <-> columns */
		/* not that useful to main project as of now */
	}

	/* more to come */
}


/* some generic array methods */
function product(arr1,arr2){
	if(arr1.length === arr2.length){
		var len = arr1.length = arr2.length;
		var prod = [];
		for(var i=0; i<len; i++){
			prod[i] = arr1[i]*arr2[i];
		}
		return prod;
	}
	else{
		throw new Error("Uneven size");
	}
}

function sum(arr1,arr2){
	if(arr2){
		if(typeof arr2 === 'Array'){
			if(arr1.length === arr2.length){
				var sum = [];
				for(var i=0; i<arr1.length; i++){
					sum[i] = arr1[i] + arr2[i];
				}
				return sum;
			}
			else{
				throw new Error("Uneven size!");
			}
		}
		else{
			var sum = [];
			for(var i=0; i<arr1.length; i++){
				sum[i] = arr1[i]+arr2;
			}
			return sum;
		}
	}
	else{
		var sum = 0;
		for(var i=0; i<arr1.length; i++){
			sum += arr1[i];
		}
		return sum;
	}
}
