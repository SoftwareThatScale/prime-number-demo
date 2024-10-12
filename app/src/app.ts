import express from 'express';
import { findPrimeNumbers } from './prime';
import { metrics } from '@opentelemetry/api';

const app = express();

app.get('/health', (req, res) => {
  res.end();
})

const meter = metrics.getMeter('prime-number-demo');
const counter = meter.createCounter('test');
counter.add(1);

app.get('/primes/:amount', async (req, res) => {
  const amount = parseInt(req.params.amount);
  const numbers = await findPrimeNumbers(amount);

  res.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
  res.json(numbers);
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
