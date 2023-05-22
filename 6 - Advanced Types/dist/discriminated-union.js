"use strict";
function printNumber(el) {
    switch (el.type) {
        case 'circle':
            console.log(`Raduis is ${el.radius}`);
            break;
        case 'square':
            console.log(`Length is ${el.length}`);
            break;
    }
}
let ourFigure = {
    type: 'circle',
    radius: 90
};
printNumber(ourFigure);
