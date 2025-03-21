import swaggerAutogen from 'swagger-autogen'
import { readdirSync } from 'fs';
import path from 'path';
import { AuthDefinition } from './.swagger/schemas/index.js';
import dotenv from 'dotenv';

const backendPath = path.dirname(path.join(process.argv[1], '..'));
dotenv.config({ path: path.join(backendPath, '.env') });

const swagger = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Gestão de Condominios",
        description: "API para gestão de condomínios"
    },
    servers: [
        {
            url: `http://localhost:${process.env.SERVER_PORT}`
        }
    ],
    components: {
        'custom-schemas': {
            AuthRequest: AuthDefinition.authRequestBody
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        { bearerAuth: [] }
    ]
};
const routesDir = path.join(backendPath, 'src', 'routes');
const endpointsFiles = readdirSync(routesDir)
    .filter(file => path.extname(file) === '.ts' && !['RouterManagement.ts', 'index.ts'].includes(file))
    .map(file => path.resolve(routesDir, file));
const outputFile = './swagger-output.json';

swagger(outputFile, endpointsFiles, doc);