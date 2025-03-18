import { PrismaClient } from '@prisma/client';

const instance = new PrismaClient();

export { instance as PrismaDB };
