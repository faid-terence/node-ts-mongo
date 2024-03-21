import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./src/routes/*.ts' , './src/docs/*.yml'], // Path to the API routes
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);