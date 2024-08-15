function factorial(n) {
  if (n < 0) {
    return undefined;
  }
  let result = 1;
  let i = 2;
  while (i <= n) {
    result *=i;
    i++;
  }
  return result;
}

console.log ( factorial (3) );
