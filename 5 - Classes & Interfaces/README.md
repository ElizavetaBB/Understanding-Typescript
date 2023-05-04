# Notes
Все про классы в JS - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes.

Про интерфейсе в TS - https://www.typescriptlang.org/docs/handbook/2/objects.html

## Classes
### Shorthand initialization
Тип инициализации полей класса без прописывания каждого поля в конструкторе вручную.
```
constructor(private field1: type, public field2: type) {}
```
### Class methods
При переходе с TS в JS методы классов превращаются в цепочку Classname.**prototype**.method

Прочитать больше о prototype можно по ссылке https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain.

### Readonly keyname
Если необходимо, чтобы поле было доступно только для чтения, необходимо для него прописать слово **readonly**
```
private readonly my_value: number;
```
### Get and Set Methods
Пишутся в следующем виде
```
get variableName() {}
set variableName(properties) {}
```
### Singletons
Создаются с помощью private constructor и static метода получения значения, хранящегося в static переменной класса.
```
class SingletoneClass {
    private static instance: SingletoneClass;
    private constructor(private name: string) {}

    public static getInstance() {
        if (SingletoneClass.instance) {
            return SingletoneClass.instance;
        } else {
            SingletoneClass.instance = new SingletoneClass('test-name');
            return SingletoneClass.instance;
        }
    }
}
```

## Interfaces
Can't have initializers (name: string = 'Jacob').

### Using
Ofter used for defining type of an object. Class can implement multiple interfaces.

Have no implementation detailes at all compared to abstract classes.

### Modifiers
Private or public aren't available, but it's possible to use `readonly`

### Inheritance
You can extend multiple interfaces (with classes it's impossible).

### Interface as a Function Type
```
interface MyFunc {
    (par1: type, par2: type): type;
}
let func: MyFunc;
func = (part1: type, part2: type) => {return part1 + patrt2};
```
## Optional parameters
You can make a variable optional by adding ?: before type
```
name?: string;
constructor(name?: string) {}
```
The same for methods:
```
add?() {}
```