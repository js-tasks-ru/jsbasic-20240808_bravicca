function sumSalary(salaries) {
  let total = 0;
  for (let key in salaries) {
    let value = salaries [key];
    if (typeof value === 'number' && isFinite (value) ) {
      total +=value;
    }
  }
      return total;// ваш код...
}
let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}

console.log (sumSalary (salaries) );