import { Elysia } from "elysia";
import todoRoutes from "./routes/todos";
import userRoutes from "./routes/users";

const todoApp = new Elysia();

todoApp
  .group("/api", (app) => {
    app.use(todoRoutes);
    app.use(userRoutes);
    return app;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${todoApp.server?.hostname}:${todoApp.server?.port}`
);
