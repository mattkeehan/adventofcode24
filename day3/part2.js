var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
const matches = data.match(regex);
let doCalc = true;

const getValFromMul = mul => {
    if (mul === 'do()') {
        doCalc = true;
        return 0;
    }
    if (mul === 'don\'t()') {
        doCalc = false;
        return 0;
    }

    const match = /mul\((\d+),(\d+)\)/.exec(mul);
    if (doCalc && match) {
        return Number(match[1]) * Number(match[2]);
    }
    return 0;
}

const result = matches.reduce((acc, mul) => acc + getValFromMul(mul), 0);

console.log(`result = ${result}`); // 