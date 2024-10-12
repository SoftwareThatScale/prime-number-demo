import { metrics, trace } from '@opentelemetry/api';
import { getFromCache, setFromCache } from './cache';

const meter = metrics.getMeter('prime');
const checkCounter = meter.createCounter('prime.check.counter', {
  description: 'Number of check if a number is prime',
});

const primeCounter = meter.createCounter('prime.counter', {
  description: 'Number of prime numbers found',
});

const tracer = trace.getTracer('prime');

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

export async function findPrimeNumbers(amount: number): Promise<Array<number>> {
  primeCounter.add(amount);

  const result = await getFromCache<Array<number>>(getCacheKey(amount));
  if (result) {
    return result;
  }

  return tracer.startActiveSpan(
    'prime.find',
    {
      attributes: {
        'prime.amount': amount,
      },
    },
    async (span) => {
      try {
        const values: Array<number> = [];

        let currentValue = 2;

        do {
          if (isPrimeNumber(currentValue)) {
            values.push(currentValue);
          }

          currentValue++;
        } while (values.length < amount && currentValue < Number.MAX_VALUE);

        setFromCache(getCacheKey(amount), values);

        return values;
      } finally {
        span.end();
      }
    }
  );
}

function getCacheKey(amount: number) {
  return `primeNumbers.${amount}`;
}
