var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const matches = data.match(/mul\(\d+,\d+\)/g);

const getValFromMul = mul => {
    const match = /mul\((\d+),(\d+)\)/.exec(mul);
    if (match) {
        return Number(match[1]) * Number(match[2]);
    }
    return 0;
}

const result = matches.reduce((acc, mul) => acc + getValFromMul(mul), 0);

console.log(`result = ${result}`); // 166357705