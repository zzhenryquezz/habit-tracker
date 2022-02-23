import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

const swaggerConfig: SwaggerConfig = {
  uiEnabled: false, //disable or enable swaggerUi route
  uiUrl: '/docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middleware array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Habit tracker api',
        version: '1.0.0',
        description: 'An application to track habits',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: {
        bearerAuth: [],
      },
    },

    apis: ['docs/swagger/**/*.yml'],
    basePath: '/',
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
}

export default swaggerConfig
