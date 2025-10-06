import prisma from "../prisma/client";

export async function createTask(data: {
  title: string;
  description?: string;
  status?: "PENDING" | "DONE";
  userId: string;
}) {
  const user = await prisma.user.findUnique({ where: { id: data.userId } });
  if (!user) throw { status: 404, message: "User not found for provided userId" };

  const task = await prisma.task.create({
    data: { title: data.title, description: data.description, status: data.status ?? "PENDING", userId: data.userId },
  });
  return task;
}

export async function listTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function getTaskById(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  if (!task) throw { status: 404, message: "Task not found" };
  return task;
}

export async function updateTask(
  id: string,
  data: Partial<{ title: string; description: string; status: "PENDING" | "DONE" }>,
) {
  await getTaskById(id);
  return prisma.task.update({ where: { id }, data });
}

export async function deleteTask(id: string) {
  await getTaskById(id);
  return prisma.task.delete({ where: { id } });
}
