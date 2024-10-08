import express from 'express';
import { findPrimeNumbers } from './prime';

const app = express();

app.get('/health', (req, res) => {
  res.end();
})

app.get('/primes/:amount', (req, res) => {
  const amount = parseInt(req.params.amount);
  const numbers = findPrimeNumbers(amount);

  res.json(numbers);
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
