// Code goes here!import 'reflect-metadata';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import _ from 'lodash';
import { Smth } from './smth.model';

declare var GLOBAL: string;

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);

const smthArray = [
    { title: 'Aaaa', price: 2222},
    { title: 'bbbb', price: 23.344}
]

const finalArray = plainToClass(Smth, smthArray);

for (let mySmth of finalArray) {
    console.log(mySmth.getInfo());
}