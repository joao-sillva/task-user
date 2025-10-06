import { Request, Response } from "express";
import * as usersUseCase from "../useCases/users.usecase";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createUser = asyncHandler(async (request: Request, response: Response) => {
  const parsed = createUserSchema.parse(request.body);
  const user = await usersUseCase.createUser(parsed);
  response.status(201).json(user);
});

export const listUsers = asyncHandler(async (request: Request, response: Response) => {
  const users = await usersUseCase.listUsers();
  response.json(users);
});

export const getUser = asyncHandler(async (request: Request, response: Response) => {
  const user = await usersUseCase.getUserById(request.params.id);
  response.json(user);
});

export const updateUser = asyncHandler(async (request: Request, response: Response) => {
  const parsed = updateUserSchema.parse(request.body);
  const user = await usersUseCase.updateUser(request.params.id, parsed);
  response.json(user);
});

export const deleteUser = asyncHandler(async (request: Request, response: Response) => {
  await usersUseCase.deleteUser(request.params.id);
  response.status(204).send();
});
