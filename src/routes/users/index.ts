import { Elysia, t } from "elysia";
import { registerUser, loginUser } from "./userHandler";

const userRoutes = new Elysia({ prefix: "/users" })
  .post(
    "/register",
    async ({ body }) => {
      try {
        const user = await registerUser(body);
        return { user };
      } catch (error: unknown) {
        if (error instanceof Error) {
          return { error: error.message };
        }
        return { error: "An unknown error occurred" };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/login",
    async ({ body }) => {
      try {
        const { user, token } = await loginUser(body);
        return { user, token };
      } catch (error: unknown) {
        if (error instanceof Error) {
          return { error: error.message };
        }
        return { error: "An unknown error occurred" };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  );

export default userRoutes;
