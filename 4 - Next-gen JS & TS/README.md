# Notes
Next-gen JS feature table - https://kangax.github.io/compat-table/es6/
## Let and var
Difference - let works only in a block section or lower block sections. It isn't true for var.
## Default function parameters
For passing default parameters you can type = 'value' at the end of the parameter:
```
function add(a: number, b: number = 3)
```
You can do it only with the last parameters. So after the first default parameter only other default parameters can be.
## Spread operator ...
Creates a full copy of an object, not only a pointer to the object. 

Article on reference values - https://academind.com/tutorials/reference-vs-primitive-values
## Rest parameters
'...' can be used in function parameters - it means that this function can accept infinite amount of parameters.
## Destructuring arrays & objects
```
let srcArray = [1, 2, 3, 4, 5];
let [firstVal, secondVal, ...restVals] = srcArray;
```
It copies values to new fields without changing the source array. 

To copy an object you have to put actual fields name in {}, because they aren't stored in a precise order as in arrays. 

To rename fields type : 'new name'. It isn't type assignment, it's a grammar for renaming.
```
let {name: newName, age} = person;
```

