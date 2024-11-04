import prisma from "../../db";

export async function getTodos() {
  try {
    return await prisma.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.error("Error getting todos:", error);
  }
}

export async function createTodo(data: { title: string; description: string }) {
  try {
    const todo = await prisma.todo.create({
      data: data,
    });
    if (!todo) {
      throw new Error("Failed to create todo");
    }

    return todo;
  } catch (error) {
    console.error("Error creating todo:", error);
  }
}

export async function getTodoById(id: number) {
  try {
    return await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error getting todo by id:", error);
  }
}

export async function updateTodo(
  id: number,
  data: { title?: string; description?: string; completed?: boolean }
) {
  try {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.completed !== undefined) updateData.completed = data.completed;

    return await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating todo by id:", error);
  }
}

export async function deleteTodo(id: number) {
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    if (!todo) {
      throw new Error("Failed to delete todo");
    }

    return todo;
  } catch (error) {
    console.error("Error deleting todo by id:", error);
  }
}
