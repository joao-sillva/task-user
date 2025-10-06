import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("invalid email"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});
