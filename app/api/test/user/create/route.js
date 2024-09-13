import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { amount, encryptData, skip, take } from "@/utils/API";

export const POST = async (req) => {
  const { searchParams } = new URL(req.url);

  let user = [];

  for (let i = 0; i < amount(searchParams); i++) {
    user.push({
      name: await encryptData(`user${parseInt(await prisma.user.count()) + i}`),
      email: await encryptData(
        `user${parseInt(await prisma.user.count()) + i}@gmail.com`,
      ),
    });
  }

  await prisma.user.createMany({
    data: user,
  });

  const length = await prisma.user.count();
  const count = user.length;

  const data = await prisma.user.findMany({
    skip: skip(searchParams),
    take: take(searchParams),
  });

  return NextResponse.json({
    message: `You have successfully created ${count} users in db`,
    length,
    data,
    status: 200,
  });
};
