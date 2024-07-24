import prisma from "@/app/lib/prisma";

export const userData = async (skip = 0, take = 10) => {
  return await prisma.user.findMany({
    skip,
    take,
  });
};
