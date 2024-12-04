var fs = require('fs');
var data = fs.readFileSync('testinput.txt').toString().trim().split('\n');
const needle = 'XMAS';

const countInRow = row => {
    const origRow = row;
    let count = 0;
    [needle, needle.split('').reverse().join('')].forEach(n => {
        while (row.indexOf(n) !== -1) {
            count++;
            row = row.slice(row.indexOf(n) + needle.length);
        }
        row = origRow;
    });

    return count;
};

const buildDiagonals = (data) => {
    const diagonals = [];
    for (let i = 0; i < data.length; i++) {
        let d1 = '', d2 = '';
        for (let j = 0; j < data.length - i; j++) {
            d1 += data[i + j][j];
            d2 += data[j][i + j];
        }
        diagonals.push(d1, d2);
    }
    for (let i = 1; i < data[0].length; i++) {
        let diag1 = '', diag2 = '';
        for (let j = 0; j < data.length - i; j++) {
            diag1 += data[j][i + j];
            diag2 += data[i + j][j];
        }
        diagonals.push(diag1, diag2);
    }
    return diagonals;
}

const buildVerticals = (data) => {
    const verticals = [];
    for (let col = 0; col < data[0].length; col++) {
        let column = '';
        for (let row = 0; row < data.length; row++) {
            column += data[row][col];
        }
        verticals.push(column);
    }
    return verticals;
}

const result = [
    ...data, 
    ...buildDiagonals(data), 
    ...buildVerticals(data)].reduce((acc, row) => acc + countInRow(row), 0);

console.log(result); // 
