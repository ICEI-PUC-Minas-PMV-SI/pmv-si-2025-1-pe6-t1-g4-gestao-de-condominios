import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { RouterManagement } from '@routes';
import { MiddlewareManagement } from '@middlewares';

const backendPath = path.dirname(path.join(process.argv[1], '..'));
dotenv.config({ path: path.join(backendPath, '.env') });

const app = express();

MiddlewareManagement.register(app);
RouterManagement.register(app);

app.get('/', (req, res) => {
  res.status(200).json({
    version: '1.0',
    timestamp: Date.now(),
  });
});

const port = process.env.SERVER_PORT;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Listening on ${port}`);
  }
});
