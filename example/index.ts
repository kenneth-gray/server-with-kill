import express from 'express';

import { transform } from '../src';

const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'example' });
});

const server = transform(
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  }),
);

setTimeout(() => {
  console.log('Close server');
  server.close(() => {
    console.log('Server closed');
  });

  const timeout = setTimeout(() => {
    console.log('Kill server');
    server.kill(() => {
      console.log('Server killed');
    });
  }, 3000);

  server.on('close', () => {
    clearTimeout(timeout);
  });
}, 3000);
