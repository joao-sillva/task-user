import { Router } from "express";
import * as TasksController from "../controllers/tasks.controller";

const router = Router();

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas com usuário associado
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *   post:
 *     summary: Cria uma nova tarefa vinculada a um usuário
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, DONE]
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada
 */
router.post("/", TasksController.createTask);
router.get("/", TasksController.listTasks);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, DONE]
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarefa deletada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", TasksController.getTask);
router.put("/:id", TasksController.updateTask);
router.delete("/:id", TasksController.deleteTask);

export default router;
