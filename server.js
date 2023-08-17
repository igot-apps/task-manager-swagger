/** @format */
require("dotenv").config({ path: "./config/task-manager.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { v4: uuidv4 } = require('uuid');

// Define Swagger JSDoc configuration
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Complex API with OpenAPI',
        version: '1.0.0',
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
      security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'], // Use a glob pattern to include route files
    }
  
  const specs = swaggerJsdoc(options);

  // Use Swagger UI to serve API documentation
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));

//connect to db
const connectDatabase = require("./config/db");
connectDatabase();

//routers
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");

//middlewares
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded());

//routes
app.use("/api/v1/", userRouter);
app.use("/api/v1/", taskRouter);
app.use("/api/v1/", authRouter);


app.use("/", (req,res) => {
  res.send(`<a href="https://${process.env.DOMAIN}/api/v1/docs">Click Me To Interact With this Basic server</a>`)
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(" server is running on port " + PORT);
});
