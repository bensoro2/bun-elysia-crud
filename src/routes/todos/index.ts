import { Elysia, t } from "elysia";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "./handler";

const todoRoutes = new Elysia({ prefix: "/todos" })
  .get("/", () => getTodos())
  .post("/", ({ body }) => createTodo(body), {
    body: t.Object({ title: t.String(), description: t.String() }),
  })
  .get("/:id", ({ params: { id } }) => getTodoById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .patch("/:id", ({ params: { id }, body }) => updateTodo(id, body), {
    body: t.Object({
      title: t.Optional(t.String()),
      description: t.Optional(t.String()),
      completed: t.Optional(t.Boolean()),
    }),
    params: t.Object({ id: t.Numeric() }),
  })
  .delete("/:id", ({ params: { id } }) => deleteTodo(id), {
    params: t.Object({ id: t.Numeric() }),
  });

export default todoRoutes;
