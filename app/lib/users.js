import { prisma } from "@/app/lib/prisma";

export const users = async (req, res) => {
  return await prisma.user.findMany({});
};
