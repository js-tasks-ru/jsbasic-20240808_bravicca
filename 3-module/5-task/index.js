function getMinMax(str) {
let numbers = str.match(/-?\d+(\.\d+)?/g)
numbers = numbers.map(Number);
return {
  min: Math.min(...numbers),
  max: Math.max(...numbers)
};
}// ваш код...
