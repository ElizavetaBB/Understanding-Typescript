# Notes
## Intersection types
https://www.typescripttutorial.net/typescript-tutorial/typescript-intersection-types/

An intersection type creates a new type by combining multiple existing types. The new type has all features of the existing types.
```
type typeAB = typeA & typeB;
```
The typeAB will have all properties from both typeA and typeB. 

When you intersect types, the order of the types doesn’t matter
## Type Guards
https://www.typescripttutorial.net/typescript-tutorial/typescript-type-guards/

1. `typeof` - for default types
2. `instanceOf` - for a class instance
3. `in`- a safe check for the existence of a property on an object
## Discriminated Union
https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
```
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;
```
Now that Shape is a union, TypeScript is telling us that shape might be a Square, and Squares don’t have radius defined on them!
## Type Casting
https://www.typescripttutorial.net/typescript-tutorial/type-casting/

JavaScript doesn’t have a concept of type casting because variables have dynamic types. However, every variable in TypeScript has a type. Type castings allow you to convert a variable from one type to another.

In TypeScript, you can use the `as` keyword or `<>` operator for type castings.
## Index Property
https://www.typescriptlang.org/docs/handbook/2/objects.html

Если не хотим ограничивать в имени свойства и количестве значений, но знаем их тип, можно написать следующее:
```
interface StringArray {
  [index: number]: string; // index might be number, string
}
```
## Optional Chaining
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining

`?.` operator for optional property accesses.
```
let x = foo?.bar.baz();
```
When foo is defined, foo.bar.baz() will be computed; but when foo is null or undefined, stop what we’re doing and just return undefined.
## Nullish Coalescing
https://mariusschulz.com/blog/nullish-coalescing-the-operator-in-typescript

`??` operator provides a fallback value for a value that might be null or undefined.
```
null ?? "n/a";
// "n/a"

undefined ?? "n/a";
// "n/a"

false ?? true;
// false
```
If you also want to skip false values, use `||`:
```
false || true;
// true
```