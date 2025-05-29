import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { RouterManagement } from '@routes';
import { MiddlewareManagement } from '@middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../scripts/swagger-output.json' assert { type: 'json' };

const backendPath = path.dirname(path.join(process.argv[1], '..'));
dotenv.config({ path: path.join(backendPath, '.env') });
process.env.projectDir = backendPath;

const app = express();
const port = process.env.SERVER_PORT;

// evita erro de cors em ambiente de desenvolvimento
function corsMiddleware(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Platform, x-platform');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
}

app.use(corsMiddleware);

MiddlewareManagement.register(app);
RouterManagement.register(app);

app.get('/', (req, res) => {
  res.status(200).json({
    version: '1.0',
    timestamp: Date.now(),
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Listening on ${port}`);
  }
});
