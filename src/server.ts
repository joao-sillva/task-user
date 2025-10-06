import app from "./app";
import dotenv from "dotenv";
import prisma from "./prisma/client";

dotenv.config();

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully.");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
