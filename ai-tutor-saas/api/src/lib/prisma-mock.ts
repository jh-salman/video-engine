// Mock Prisma client for when database is not available
export const prismaMock = {
  tutorial: {
    create: async (data: any) => {
      return {
        id: `mock-${Date.now()}`,
        ...data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    findUnique: async (params: any) => {
      return null; // Return null for mock - tutorials need to be created first
    },
    update: async (params: any) => {
      return {
        ...params.data,
        id: params.where.id,
        updatedAt: new Date(),
      };
    },
  },
  user: {
    create: async (data: any) => {
      return {
        id: `user-${Date.now()}`,
        ...data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    findUnique: async (params: any) => {
      return null;
    },
  },
};

