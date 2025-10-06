import { Request, Response } from "express";
import * as tasksUseCase from "../useCases/tasks.usecase";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createTask = asyncHandler(async (request: Request, response: Response) => {
  const parsed = createTaskSchema.parse(request.body);
  const task = await tasksUseCase.createTask(parsed);
  response.status(201).json(task);
});

export const listTasks = asyncHandler(async (request: Request, response: Response) => {
  const tasks = await tasksUseCase.listTasks();
  response.json(tasks);
});

export const getTask = asyncHandler(async (request: Request, response: Response) => {
  const task = await tasksUseCase.getTaskById(request.params.id);
  response.json(task);
});

export const updateTask = asyncHandler(async (request: Request, response: Response) => {
  const parsed = updateTaskSchema.parse(request.body);
  const task = await tasksUseCase.updateTask(request.params.id, parsed);
  response.json(task);
});

export const deleteTask = asyncHandler(async (request: Request, response: Response) => {
  await tasksUseCase.deleteTask(request.params.id);
  response.status(204).send();
});
