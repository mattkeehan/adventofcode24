var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const allIncreasingSafely = (line) => {
    for (let i = 1; i < line.length; i++) {
        const current = Number(line[i]);
        const previous = Number(line[i - 1]);
        if (current < previous + 1 || current > previous + 3) {
            return false;
        }
    }
    return true;
}

const total = data.split('\n').reduce((acc, line) => {
    const nums = line.split(' ');
    if (allIncreasingSafely(nums) || allIncreasingSafely(nums.reverse())) {
        return acc + 1;
    }
    return acc;
}, 0);


console.log(total);
// 686