import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(express.json());

// Swagger UI em /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.get("/", (request, response) => response.send("API running"));
app.use(errorHandler);

export default app;
