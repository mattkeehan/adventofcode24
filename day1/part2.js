var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const [leftArray, rightArray] = data.trim().split('\n').reduce(
  ([left, right], line) => {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    return [[...left, l], [...right, r]];
  },
  [[], []]
);

const result = leftArray.map(num => num * rightArray.filter(x => x === num).length).reduce((a, b) => a + b, 0);
console.log(result);
// 19437052