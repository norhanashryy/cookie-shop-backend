const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
// it'll be used to connect to the database and perform CRUD operations