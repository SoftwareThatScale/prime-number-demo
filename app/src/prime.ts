import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter('prime');
const checkCounter = meter.createCounter('prime.check.counter', {
  description: 'Number of check if a number is prime'
});

const primeCounter = meter.createCounter('prime.counter', {
  description: 'Number of prime numbers found'
})

function isPrimeNumber(number: number): boolean {
  checkCounter.add(1);

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
  primeCounter.add(amount);

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
