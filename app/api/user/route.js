import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { decryptData, skip, take } from "@/utils/API";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const length = await prisma.user.count();
  const userData = await prisma.user.findMany({
    skip: skip(searchParams),
    take: take(searchParams),
  });

  const data = await Promise.all(
    userData.map(async (items) => {
      return {
        id: items.id,
        name: await decryptData(items.name),
        email: await decryptData(items.email),
        image: items.image,
        role: items.role,
        createdAt: items.createdAt,
        updatedAt: items.updatedAt,
      };
    }),
  );

  return NextResponse.json({
    message: "You have received the data successfully",
    data,
    length,
  });
};
