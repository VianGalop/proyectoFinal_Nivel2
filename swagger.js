import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',            // by default: '1.0.0'
    title: 'REST API BLOGGIEND',              // by default: 'REST API'
    description: ''         // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
      description: ''       // by default: ''
    },
    // { ... }
  ],
  tags: [                   // by default: empty Array
    {
      name: '',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  components: {}            // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./src/index.js', './src/routes/users.routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);
swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await import('./index.js'); // Your project's root file
});