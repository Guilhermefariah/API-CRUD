const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your Express application',
    },
    servers: [
      {
        url: 'http://localhost:8800', 
      },
    ],
  },
  apis: ['./api/*.js', './api/swagger.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
