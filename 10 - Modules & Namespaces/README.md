# Notes
## Splitting code into mulitple files
1. Namespaces & File Building
Put code in a new file with `export` and `namespace`:
```
namespace DOInterfaces {
    export interface Draggable {
        //
    }
    export interface DragTarget {
        //
    }
}
```
Then use in another file:
```
/// <reference path="path-to-file.ts"/>

namespace DOinterfaces {code}
```
Type in `tsconfig.js` to compile multiple files just in one file:
```
"outFile": ".dist/test.js"
```
2. ES6 Imports/Exports
To import file:
```
import from '../drag-drop-interfaces.ts'
```
Import all functions and properties:
```
import * as DragInter from 'path';
```
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b