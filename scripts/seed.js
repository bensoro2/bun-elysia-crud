const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const todoToCreate = [
  {
    id: 1,
    title: "Learn Elysia",
    description: "Learn the framework",
    completed: true,
  },
  {
    id: 2,
    title: "Learn Prisma",
    description: "Learn the ORM",
    completed: true,
  },
  {
    id: 3,
    title: "Learn Bun",
    description: "Learn the runtime",
    completed: true,
  },
];

const seed = async (todo) => {
  console.log("Seeding data...");
  for (let i = 0; i < todo.length; i++) {
    await client.todo.upsert({
      where: { id: todo[i].id },
      update: todo[i],
      create: todo[i],
    });
  }
};

seed(todoToCreate)
  .then(() => console.log("Data seeded successfully"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Connection closed");
  });
