
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Attempting to connect to the database...');
    // Simple query to test connection
    const userCount = await prisma.user.count();
    console.log(`Successfully connected! User count: ${userCount}`);
  } catch (error) {
    console.error('Failed to connect to the database:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
