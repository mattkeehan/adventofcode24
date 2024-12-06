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
    const newDiagonals = [];
    const n = data.length;
    const m = data[0].length;

    // Top-left to bottom-right diagonals
    for (let i = 0; i < n; i++) {
        let d1 = '', d2 = '';
        for (let j = 0; j < Math.min(n - i, m); j++) {
            d1 += data[i + j][j]; // starting at (i, 0)
            d2 += data[j][i + j]; // starting at (0, i)
        }
        diagonals.push(d1, d2);
    }

    console.log(diagonals)

    // Bottom-left to top-right diagonals
    for (let i = 0; i < n; i++) {
        let d1 = '', d2 = '';
        for (let j = 0; j <= i && j < m; j++) {
            d1 += data[i - j][j]; // Diagonal starting at (i, 0)
            d2 += data[n - 1 - j][m - 1 - (i - j)]; // Diagonal starting at (n-1, m-1-i)
        }
        newDiagonals.push(d1, d2);
    }

    console.log(newDiagonals)

    // Top-right to bottom-left diagonals
    // for (let i = 1; i < m; i++) {
    //     let diag1 = '', diag2 = '';
    //     for (let j = 0; j < Math.min(n, m - i); j++) {
    //         diag1 += data[j][i + j]; // starting at (0, i)
    //         diag2 += data[i + j][j]; // starting at (i, 0)
    //     }
    //     newDiagonals.push(diag1, diag2);
    // }

    console.log(newDiagonals);

    return [...diagonals, ...newDiagonals];
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
    console.log(verticals);
    return verticals;
}

const result = [
    ...data, 
    ...buildDiagonals(data),
    ...buildVerticals(data)].reduce((acc, row) => acc + countInRow(row), 0);

console.log(result); // 
