import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  console.error(error);

  // Prisma unique constraint (email)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return response.status(409).json({ message: "Registro duplicado." });
    }
  }

  if (error.status) {
    return response.status(error.status).json({ message: error.message });
  }

  response.status(500).json({ message: "Internal server error" });
}
