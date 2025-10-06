import prisma from "../prisma/client";

export async function createUser(data: { name: string; email: string }) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function listUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw { status: 404, message: "User not found" };
  return user;
}

export async function updateUser(id: string, data: Partial<{ name: string; email: string }>) {
  await getUserById(id); // ensures exists or throws 404
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
  await getUserById(id); // ensures exists or throws 404
  await prisma.task.deleteMany({ where: { userId: id } }); // optional: delete tasks or enforce FK cascade
  return prisma.user.delete({ where: { id } });
}
