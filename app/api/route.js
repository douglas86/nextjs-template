import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET(req, res) {
  const results = await prisma.user.findMany();

  return res.status(200).json(results);
}
