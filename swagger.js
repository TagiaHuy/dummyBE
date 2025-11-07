const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CMCMP3 API',
      version: '1.0.0',
      description: 'A simple Express API for a music streaming service',
    },
    servers: [
      {
        url: 'http://localhost:8082',
      },
    ],
    components: {
      schemas: {
        Song: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the song',
            },
            title: {
              type: 'string',
              description: 'The title of your song',
            },
            artist: {
              type: 'string',
              description: 'The song artist',
            },
            duration: {
              type: 'integer',
              description: 'The duration of the song in seconds',
            },
            filePath: {
              type: 'string',
              description: 'The path to the song file',
            },
          },
        },
        Playlist: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the playlist',
            },
            name: {
              type: 'string',
              description: 'The name of your playlist',
            },
            description: {
              type: 'string',
              description: 'The playlist description',
            },
            songs: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The songs in the playlist',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            username: {
              type: 'string',
              description: 'The username of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
