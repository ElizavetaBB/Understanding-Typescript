# Different ways of compilation
## Compile after saving a file
```
tsc app.ts --watch
tsc app.ts -w
```
## Compile all files in the project
For starting compilation of all .ts files in the resource folder type:
```
tsc --init
```
This command will create a file 'tsconfig.json' with different configurations of compilation.
Then to compile these files:
```
tsc
```
of for compilation after every saving:
```
tsc -w
```
## tsconfig options
### include
'Include' specifies only the files that will be compiled, the rest won't be.
```
"include": ["app.ts" or "*.ts"]
```
### exclude
'Exclude' specifies files that won't be compiled. It can also be a folder.
```
"exclude": ["folder name"]
```
### files
'Files' contains names of files that should exist in the project. Otherwise, there will be a compilation error.
```
"files": ["app.ts"]
```
## Compiler options
All options you can see by the link https://www.typescriptlang.org/docs/handbook/compiler-options.html
### **target**
Target is a version of JS in which TS will be compiled. To see all option press 'Ctrl'+'Space' in VS Code.
### **lib**
By default contains values ["dom", "dom.iterable", "es6", "scripthost"].

It has all libraries to this project. 
### **sourceMap**
sourceMap: true - simplifies debagging. 

It allows to see .ts files in sources of a browser.
### **noEmitOnErrors**
noEmitOnErrors = true - project, if there're files with errors, won't be compiled. 

By default files with errors are compiled.
### **Code Quality Options**
"noUnusedLocals": true, "noUnusedParameters": true (function parameters), 

"noImplicitReturns": true (if a function sometimes returns something, and sometimes not), 

"noFallthroughCasesInSwitch": true - shows that you forgot to put `break` in switch-case.