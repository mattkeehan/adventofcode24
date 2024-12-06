var fs = require('fs');
var data = fs.readFileSync('input.txt').toString();

const getBlocks = text => {
  const parts = text.split(/\n\s*\n/);
  const orderingRules = parts[0].split('\n');
  const updates = parts[1].split('\n');

  return {orderingRules, updates};
}

const removeBadUpdates = (rules, updates) => updates.filter(update => {
  return rules.every(rule => {
    const [first, last] = rule.split('|');
    const startPos = update.indexOf(first);
    const endPos = update.indexOf(last);
    
    return (startPos > -1 && endPos > -1) ? (startPos < endPos) : true;
  });
});

const {orderingRules, updates} = getBlocks(data);
const validUpdates = removeBadUpdates(orderingRules, updates);
const sumValidMiddles = validUpdates.reduce((acc, update) => {
  const els = update.split(',');
  return Number(els[Math.floor(els.length / 2)]) + acc
}, 0);

console.log(sumValidMiddles);
/*
  5732
*/