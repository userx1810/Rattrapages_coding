const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function run() {
  const saltRounds = 10; // Nombre de rounds pour générer le sel
  const plainPassword = "password123";

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log("Hashed Password:", hashedPassword);

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Do they match?", isMatch);
}

run().catch((err) => console.error(err));

async function main() {
  // Créer un nouvel utilisateur
  const newUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "password123",
    },
  });
  console.log("New User:", newUser);

  // Lire tous les utilisateurs
  const allUsers = await prisma.user.findMany();
  console.log("All Users:", allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
