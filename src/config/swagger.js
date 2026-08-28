const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./index');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank Sampah Management API',
      version: '1.0.0',
      description: 'REST API for Bank Sampah Management System',
      contact: {
        name: 'API Support',
        email: 'support@banksampah.com',
      },
    },
    servers: [
      { url: `http://localhost:${config.app.port}/api/v1`, description: 'Development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

module.exports = swaggerJsdoc(options);
