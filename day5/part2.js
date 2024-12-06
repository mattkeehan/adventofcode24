var fs = require('fs');
var data = fs.readFileSync('testinput.txt').toString();

const getBlocks = text => {
  const parts = text.split(/\n\s*\n/);
  const orderingRules = parts[0].split('\n');
  const updates = parts[1].split('\n');

  return {orderingRules, updates};
}

const removeGoodUpdates = (rules, updates) => updates.filter(update => {
  return !rules.every(rule => {
    const [first, last] = rule.split('|');
    const startPos = update.indexOf(first);
    const endPos = update.indexOf(last);
    
    return (startPos > -1 && endPos > -1) ? (startPos < endPos) : true;
  });
});

const orderUpdates = (rules, updates) => {
  const compareToRules = (a, b) => {
    const possibleRules = [`${a}|${b}`, `${b}|${a}`];
  
    if (rules.includes(possibleRules[0])) {
      return -1;
    } else if (rules.includes(possibleRules[1])) {
      return 1;
    }
  };

  return updates.reduce((acc, update) => {
    console.log(`update ${update}`);
    const sorted = update.split(',').map(n => Number(n)).sort(compareToRules);
    if (update.toString() !== sorted.toString()) {
      return acc + sorted[Math.floor(sorted.length / 2)];
    } 
      return acc;
  }, 0); 
}

const {orderingRules, updates} = getBlocks(data);
const dodgyUpdates = removeGoodUpdates(orderingRules, updates);
const orderedUpdates = orderUpdates(orderingRules, dodgyUpdates);
console.log(orderedUpdates) // 4716
