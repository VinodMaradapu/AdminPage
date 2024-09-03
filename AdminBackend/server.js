// import express from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import cors from 'cors'; // Import the cors module
// import connectDB from './config/db.js'; // Ensure .js extension for ES modules
// import userRoutes from './routes/userRoutes.js'; // Ensure .js extension for ES modules

// const app = express();

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
//   allowedHeaders: ['Content-Type'],
// }));
// app.use(bodyParser.json());

// // Routes
// app.use('/api', userRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// import express from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from 'swagger-jsdoc';

// const app = express();

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Swagger definition
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'User Management API',
//     version: '1.0.0',
//     description: 'API documentation for the User Management system',
//   },
//   servers: [
//     {
//       url: 'http://localhost:5000',
//       description: 'Local server',
//     },
//   ],
// };

// // Options for the swagger docs
// const options = {
//   swaggerDefinition,
//   apis: ['./routes/userRoutes.js'], // Path to your API routes files
// };

// // Initialize swagger-jsdoc
// const swaggerSpec = swaggerJsdoc(options);

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type'],
// }));
// app.use(bodyParser.json());

// // Swagger UI setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use('/api', userRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'API documentation for the User Management system',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'johndoe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com',
          },
          PhoneNumber: {
            type: 'string',
            example: '+1234567890',
          },
          Active: {
            type: 'boolean',
            example: true,
          },
          date: {
            type: 'string',
            format: 'date-time',
            example: '2024-09-01T12:34:56Z',
          },
        },
      },
    },
  },
  paths: {
    '/api/allVenders': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/saveVenders': {
      post: {
        summary: 'Save a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
          },
        },
      },
    },
    '/api/updateVenders/{email}': {
      put: {
        summary: 'Update an existing user',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
          },
          '400': {
            description: 'Bad request',
          },
        },
      },
    },
    '/api/deleteVenders/{email}': {
      delete: {
        summary: 'Delete a user (soft delete)',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User deleted',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
          },
          '400': {
            description: 'Bad request',
          },
        },
      },
    },
    '/api/restoreVenders/{email}': {
      patch: {
        summary: 'Restore a soft-deleted user',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User restored',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found or already active',
          },
          '400': {
            description: 'Bad request',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/userRoutes.js'], // Ensure this path is correct
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
