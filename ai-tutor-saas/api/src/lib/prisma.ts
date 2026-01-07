import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

try {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch (error) {
  console.warn('[WARN] Prisma Client initialization failed, database operations will be limited');
  // Create a minimal mock client
  prismaInstance = {
    tutorial: {
      create: async () => { throw new Error('Database not available'); },
      findUnique: async () => null,
      update: async () => { throw new Error('Database not available'); },
    },
    user: {
      create: async () => { throw new Error('Database not available'); },
      findUnique: async () => null,
    },
  } as any;
}

export const prisma = prismaInstance;

