function isPrimeNumber(number: number): boolean {
  if (number <= 1) {
    return false;
  }

  const max = Math.sqrt(number);

  for (let i = 2; i <= max; i++) {
    if (number % i === 0) return false;
  }

  return number > 1;
}

export function findPrimeNumbers(amount: number): Array<number> {
  const values: Array<number> = [];

  let currentValue = 2;

  do {
    if (isPrimeNumber(currentValue)) {
      values.push(currentValue);
    }

    currentValue++;
  } while (values.length < amount && currentValue < Number.MAX_VALUE);

  return values;
}
