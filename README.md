[![Code Climate](https://codeclimate.com/github/AbT10/Vector_JS/badges/gpa.svg)](https://codeclimate.com/github/AbT10/Vector_JS) | [![Build Status](https://travis-ci.org/AbT10/Vector_JS.svg?branch=master)](https://travis-ci.org/AbT10/Vector_JS)

# Vector_ JS
Dealing with N-dimensional Arrays and Vectors....<br />
<h6>Note : It's still a work in progress...</h6>

# The Use Cases

* Machine Learning Requires computing mostly in terms of multi-dimensional vectors and arrays.
* Complex matrix and array calculations.
* Simplifying the complex array operations.


# Inspiration 

<p>
The <b>Numpy ndarray</b> object is very powerful for performing complex array operations... Unfortunately it's not available for our lovely js.
I'm trying to implement Machine Learning Algorithms in Javascript, Learning and implementing on the go...
So to simplify some code and easily perform the operations i tried to somewhat mimic the numpy ndarray.
Although it's not that advanced yet, but soon it will be...
</p>

# Usage

<h2><b> The Exported Object </b></h2>

<p> When you import the script with - </p>
<code> var vector = require('vector_js');</code>

it returns an object with three elements : 

<code>
{<br />
Vector : Vector,<br />
sum : sum,<br />
product : product<br />
}
</code>

<h1><b> The Vector object </b></h1>

<p> This is the main object, It's basically a class to define a vector or an n-dimensional array.
<br />
you can create a new <b>vector</b> or <b>n-dimensional array</b> by : <br /><br />

<code> 
var v = new vector.Vector(<em>args</em>);
</code>

<h3> <b> The args </b></h3>
<p>
The constructor recieves two parameters : <br />
1. The Shape of the vector.
2. The array itself or the elements of the array or n-dimensional vector.

Although the arguments can be left empty and the Vector object will be initialised with an empty array as the array property and an empty array as the shape.

You can always change or alter the properties via the Vector methods.

</p>

The constructed object for a 2-dimensional array with shape <code> [2,3] </code> 
(meaning 2 elements having 3 elements each)
and the array <code> [[1,2,3],[4,5,6]] </code> looks like this : <br /><br />
<code>
Object { array: Array[2], shape: Array[2], size: 6, dim: 2, flat: Array[6] }
</code>

<h2><b>The Properties of the Vector Object</b></h2>

A Vector Object Has the following properties : <br />
<br />
<h3><b>Shape</b></h3>

Defines The Structure of the array, i.e., the number of layers inside the array that defines the number of elements and if that element is itself an array, the number of elements inside it.
As seen in the above example for the shape <code>[2,3]</code> The array was a 2-d array with 2 elements(arrays) having 3 elements each.

<h3><b>Array</b></h3>

The array itself, containig the data.

<h3><b>Dimension(dim)</b></h3>

The Dimension of the array. For the above case : <code> dim = 2</code>

<h3><b>Size</b></h3>

The total number of elements(scalar) in the n-dimension array

<h3><b>flat</b></h3>

It's the 1-d version of the n-dimensional array.

***************************************************************************************************************************************

<h1><b> The Methods </b></h1>
....................................







