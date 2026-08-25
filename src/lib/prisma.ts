// // // import { PrismaClient } from "@prisma/client";
// // // import { PrismaPg } from "@prisma/adapter-pg";
// // // import { Pool } from "pg";

// // // const connectionString = process.env.DATABASE_URL;

// // // const pool = new Pool({ connectionString });
// // // const adapter = new PrismaPg(pool);

// // // const globalForPrisma = global as unknown as { prisma: PrismaClient };

// // // export const prisma =
// // //   globalForPrisma.prisma ||
// // //   new PrismaClient({
// // //     adapter,
// // //     log: ["query", "error"],
// // //   });

// // // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// // import { PrismaClient } from "@prisma/client";

// // const globalForPrisma = globalThis as unknown as {
// //   prisma: PrismaClient | undefined;
// // };

// // export const prisma =
// //   globalForPrisma.prisma ??
// //   new PrismaClient({
// //     log: ["query"],
// //   });

// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
