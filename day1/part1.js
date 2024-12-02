var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const [leftArray, rightArray] = data.trim().split('\n').reduce(
  ([left, right], line) => {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    return [[...left, l], [...right, r]];
  },
  [[], []]
);

leftArray.sort();
rightArray.sort();

console.log(leftArray.reduce((acc, cur, idx) =>  acc + Math.abs(rightArray[idx] - cur), 0));
// 1882714