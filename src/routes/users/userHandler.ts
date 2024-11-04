import prisma from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function registerUser(data: {
  username: string;
  password: string;
}) {
  const { username, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw new Error("User registration failed");
  }
}

export async function loginUser(data: { username: string; password: string }) {
  const { username, password } = data;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return { user, token };
}
