import { createClient } from 'redis';

const client = createClient({
  url: 'redis://redis',
});

client.connect();

export async function setFromCache(key: string, value: any): Promise<void> {
  await client.set(key, JSON.stringify(value));
}

export async function getFromCache<T>(key: string): Promise<T | null> {
  const value = await client.get(key);
  if (!value) {
    return null;
  }

  return JSON.parse(value);
}