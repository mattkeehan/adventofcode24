var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const notIncreasing = (current, previous) => current < previous + 1;
const increasingTooMuch = (current, previous) => current > previous + 3;

const allIncreasingSafely = (line, recur = true) => {
    for (let i = 1; i < line.length; i++) {
        const current = Number(line[i]);
        const previous = Number(line[i - 1]);
        if (notIncreasing(current, previous) || increasingTooMuch(current, previous)){
            if (recur === false) return false;
            for (let j = 0; j < line.length; j++) {
                const nextline = [...line.slice(0, j), ...line.slice(j + 1)]
                if (allIncreasingSafely(nextline, false)) {
                    return true
                }   
            }
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
// 717