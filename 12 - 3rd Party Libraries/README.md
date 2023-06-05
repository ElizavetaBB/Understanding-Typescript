# Notes
## Normal libraries (which work in JS)
.d.ts - declaration files. They don't have any logic, but they contain translations from JS to TS.

To use JS library in TS type:
```
npm install --save @types/'library name'
```
All JS libraries: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types.

Own transdlation JS -> TS: 
```
declare var var_name: type;
```
`declare` means that this value exists somewhere in HTML.
## TS-specific libraries
1. Install library:
```
npm instal ...
```
2. Use library in code:
```
import { ... } from '...';
```