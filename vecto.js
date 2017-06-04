/* A JS library for dealing with n-dimensional vectors. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */

class Vector{
	constructor(shape=[],arr=[]){
		this.array = arr;
		this.shape = ((shape.length)>0) ? shape : (this.calc_shape(this.array));
		this.size = this.calc_size(this.shape);
		this.dim = this.find_dim();
		this.flat = [];
		Vector.flatten(this.array,this.flat);
	}
	
	/* class specific (static) methods */
    /* form a new vector for the given array */
	static array(arr){
		return new Vector([],arr);
	}

    /* make a new zero Vector */
	static zeroes(shape){
		let base_arr = Vector.fill(shape[shape.length-1],0);
		let arr = shape.length < 2 ? base_arr : [];
			for(let i=shape.length-2; i>=0; i--){
				arr = [];
				for(let j=0; j<shape[i]; j++){
					arr.push(base_arr);
				}
				base_arr = arr;
			}
		return new Vector(shape,arr);
	}

   	
   /* sum of 2 vectors */
   static add(v1,v2){
	   if(v1.size === v2.size){
		   let sum = [];
		   for(let i=0; i<v1.flat.length; i++){
			   sum[i] = v1.flat[i] + v2.flat[i];
		   }
		   let v = new Vector(v1.shape);
		   v.arrange(sum);
		   return v;
	   }
	   else{
		   return new Error("Unequal Size");
	   }
   }

   /* function to convert n-dimension array into 1-D array */

	static flatten(arr,tarr){
		for(let i of arr){
			if(Array.isArray(i)){
				this.flatten(i,tarr);
			}
			else{
				tarr.push(i);
			}
	    }
	}


   /* fills the vector acc to passed args */
   static fill(len, fill_style="array", ...args){
		const arr = [];
	  	let i;
		if(!args || args.length === 0){
			for(i=0; i<len; i++){
				arr[i] = Math.random();
			}
		}
		else{
			if(args.length === 1){
				if(Array.isArray(args[0]) && fill_style === "array"){
					for(i=0; i<len; i++){
						arr[i] = args[0];
					}
				}
				else if(Array.isArray(args[0]) && fill_style !== "array"){
					let j=0;
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
					let min = args[0],
					max = args[1],
					num = min;
					for(i=0; i<len; i++){
						arr[i] = num++;
						if(num > max){
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
	
	find_dim(){
		return this.shape.length;
	}
	
	calc_shape(arr){
		const shape = [];
		shape.push(arr.length);
		let a = arr[0];
		while(Array.isArray(a)){
			shape.push(a.length);
			a = a[0];
		}
		return shape;
	}

	/* find the size of the array */
	calc_size(shape){
		let size = 1;
		for(let i of shape){
			size *= i;
		}
		return size;
	}

  
	/* a method to arrange or create a Vector from the given elements */
	arrange(elems_arr,fill_style="linear"){
		const dim = this.dim;
		let base_arr = elems_arr,
		curr_arr;
		for(let i=dim-2; i>=-1; i--){
			curr_arr = Vector.fill(this.shape[i+1],fill_style,base_arr);
			base_arr = curr_arr;
		}
		this.array = base_arr;
		this.flat = [];
		Vector.flatten(this.array,this.flat);
	}

	/* reshapes the vector only if for the new shape the number of elements remain same */
	reshape(new_shape){
		if(this.calc_size(new_shape) === this.size){
			/* reshape */
			const temp_arr = this.flat;
			this.shape = new_shape;
			this.dim = this.find_dim();
			this.flat = [];
			this.arrange(temp_arr);
		}
		else{
			return new Error("Resizing error : can't change the size");
		}
	}
	
	/* changes the shape and size of the vector in place */
	resize(new_shape){
		const temp_arr = this.flat;
		this.shape = new_shape;
		this.size = this.calc_size(this.shape);
		this.dim = this.find_dim();
		this.flat = [];
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

/* product : test cases : 
^ *1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
*2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
*3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
*4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
^ *5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]
^ *6 a * x || [a] * [x]  // return a*x
*/
function product(arr1,arr2){
	const prod = [];
	if(!Array.isArray(arr1) && !Array.isArray(arr2)){  
		return arr1*arr2;
	}
	else{
		if(Array.isArray(arr1) && !Array.isArray(arr2)){  
			arr1.forEach((i)=>{
				if(Array.isArray(i)){  
					prod.push(product(i,arr2));   
				}
				else{
					prod.push(i*arr2);
				}
			});
		}
		else if(!Array.isArray(arr1) && Array.isArray(arr2)){
			return product(arr2,arr1);
		}
		else{
			if(Array.isArray(arr1[0]) && !Array.isArray(arr2[0])){  //checking if arg1 is n-d and arg2 is 1-d
				if(arr1[0].length === arr2.length){
					arr1.forEach((j)=>{
						prod.push(product(j,arr2));
					})
				}
				else{
					if(arr1.length === arr2.length){
						let i = 0;
						arr1.forEach((j)=>{
							prod.push(product(j,arr2[i++]));
						})
					}
					else{
						throw new Error("Uneven size!");
					}
				}
			}
			else{
				if(Array.isArray(arr1[0] && Array.isArray(arr2[0]))){
					if(arr1.length === arr2.length){
						for(let i=0; i<arr1.length; i++){
							prod.push(product(arr1[i],arr2[i]));
						}
					}
					else{
						throw new Error("Uneven Size");
					}
				}
				else{
					if(arr1.length === arr2.length){
						for(let i=0; i<arr1.length; i++){
							prod.push(arr1[i]*arr2[i]);
						}
					}
					else{
						throw new Error("Uneven Size");
					}
				}
			}
		}
	}
	return prod;
}

function sum(arr1,arr2){
	let summ;
	if(!Array.isArray(arr1) && !Array.isArray(arr2)){
		return arr1+arr2;
	}
	else{
		if(!arr2){
			if(Array.isArray(arr1[0])){
				summ = arr1.map((i)=>{
					return sum(i);
				})
				return summ;
			}
			else{
				summ = 0;
				arr1.forEach((i)=>{
					summ += i;
				})
				return summ;
			}
		}
		if(Array.isArray(arr1) && !Array.isArray(arr2)){
			summ = [];
			arr1.forEach((i)=>{
				summ.push(i+arr2);
			});
		} 
		else if(Array.isArray(arr2) && !Array.isArray(arr1)){
			sum(arr2,arr1);
		}
		else{
			if(arr1.length === arr2.length){
				summ = [];
				if(Array.isArray(arr1[0]) && Array.isArray(arr2[0])){
					for(let i=0; i<arr1.length; i++){
						summ.push(sum(arr1[i],arr2[i]));
					}
				}
				else{
					for(let i=0; i<arr1.length; i++){
						summ.push(arr1[i] + arr2[i]);
					}
				}
			}
		}
	}
	return summ;	
}


module.exports =  {
	sum : sum,
	product : product,
	Vector : Vector
};
