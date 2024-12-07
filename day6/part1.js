var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();
const grid = data.split('\n').map(line => line.split(''));

let guard = '^';
const barrier = '#';
const record = 'X';

const walkNorth = (guardStartArr, guardStartPos) => { // ^
    if (guardStartPos === 0) {
        return false;
    }
    if (grid[guardStartArr - 1][guardStartPos] === barrier) {
        guard = '>';
        grid[guardStartArr][guardStartPos] = guard;
    } else {
        grid[guardStartArr - 1][guardStartPos] = guard;
        grid[guardStartArr][guardStartPos] = record;
    }
    return true;
}

const walkEast = (guardStartArr, guardStartPos) => { // >
    if (guardStartPos === guardStartArr.length - 1) {
        return false;
    }
    if (grid[guardStartArr][guardStartPos + 1] === barrier) {
        guard = 'v';
        grid[guardStartArr][guardStartPos] = guard;
        
    } else {
        grid[guardStartArr][guardStartPos] = record;
        grid[guardStartArr][guardStartPos + 1] = guard;
    }
    return true;
}

const walkSouth = (guardStartArr, guardStartPos) => { // v
    if (guardStartArr === grid[0].length-1) {
        return false;
    }
    if (grid[guardStartArr + 1][guardStartPos] === barrier) {
        guard = '<';
        grid[guardStartArr][guardStartPos] = guard;
    } else {
        grid[guardStartArr][guardStartPos] = record;
        grid[guardStartArr + 1][guardStartPos] = guard;
    }
    return true;
}

const walkWest = (guardStartArr, guardStartPos) => { // <
    if (guardStartPos === 0) {
        return false;
    }
    if (grid[guardStartArr][guardStartPos - 1] === barrier) {
        guard = '^';
        grid[guardStartArr][guardStartPos] = guard;
    } else {
        grid[guardStartArr][guardStartPos] = record;
        grid[guardStartArr][guardStartPos - 1] = guard;
    }

    return true;
}

let keepGoing = true;
while(keepGoing) {
    const guardStartArr = grid.findIndex(line => line.includes(guard));
    const guardStartPos = grid.filter(line => line.includes(guard)).map(line => line.indexOf(guard));

    if (guard === '^') {
        keepGoing = walkNorth(guardStartArr, Number(guardStartPos));
    }

    if (guard === '>') {
        keepGoing = walkEast(guardStartArr, Number(guardStartPos));
    }

    if (guard === 'v') {
        keepGoing = walkSouth(guardStartArr, Number(guardStartPos));
    }

    if (guard === '<') {
        keepGoing = walkWest(guardStartArr, Number(guardStartPos));
    }
}

const reformedData = grid.map(line => line.join('')).join('\n').replace(/v/g, 'X');
// console.log(reformedData); <-- uncomment to see the grid
const countX = reformedData.split('').filter(char => char === 'X').length;

console.log(`Number of X's: ${countX}`); // 4515