import swaggerAutogen from 'swagger-autogen'
import { readdirSync } from 'fs';
import path from 'path';
// ({ openapi: '3.0.0' });
const swagger = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Gestão de Condominios",
        description: "API para gestão de condomínios"
    },
    servers: [
        {
            url: 'http://localhost:8080'
        }
    ],
    components: {
        // schemas: {
        //     someBody: {
        //         $name: "Jhon Doe",
        //         $age: 29,
        //         about: ""
        //     },
        //     someResponse: {
        //         name: "Jhon Doe",
        //         age: 29,
        //         diplomas: [
        //             {
        //                 school: "XYZ University",
        //                 year: 2020,
        //                 completed: true,
        //                 internship: {
        //                     hours: 290,
        //                     location: "XYZ Company"
        //                 }
        //             }
        //         ]
        //     },
        //     someEnum: {
        //         '@enum': [
        //             "red",
        //             "yellow",
        //             "green"
        //         ]
        //     }
        // },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};
const backendPath = path.dirname(path.join(process.argv[1], '..'));
const routesDir = path.join(backendPath, 'src', 'routes');
const endpointsFiles = readdirSync(routesDir)
    .filter(file => path.extname(file) === '.ts' && !['RouterManagement.ts', 'index.ts'].includes(file))
    .map(file => path.resolve(routesDir, file));
const outputFile = './swagger-output.json';

swagger(outputFile, endpointsFiles, doc);