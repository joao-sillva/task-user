import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-jsdoc";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API REST para gerenciar usuários e tarefas",
    },
    servers: [
      {
        url: "http://localhost:3333/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // os comentários das rotas
};

export const swaggerSpec = swaggerJsdoc(options);
