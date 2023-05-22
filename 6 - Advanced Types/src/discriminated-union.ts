interface Circle {
    type: 'circle',
    radius: number
}

interface Square {
    type: 'square',
    length: number
}

type Figure = Circle | Square;

function printNumber(el: Figure) {
    switch(el.type) {
        case 'circle':
            console.log(`Raduis is ${el.radius}`);
            break;
        case 'square':
            console.log(`Length is ${el.length}`);
            break;
    }
}

let ourFigure: Figure = {
    type: 'circle',
    radius: 90
}

printNumber(ourFigure);