import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { decryptData, skip, take, filter } from "@/utils/API";

/**
 * GET request for users data stored in database
 * @param req
 * @returns {Promise<NextResponse<{data: Awaited<unknown>[], length: *, message: string}>>}
 * @constructor
 */
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  // fetches number of documents in db
  const length = await prisma.user.count({
    where: {
      role: filter(searchParams, "user"),
    },
  });

  // fetches users' data from db based
  const userData = await prisma.user.findMany({
    where: { role: filter(searchParams, "user") },
    skip: skip(searchParams),
    take: take(searchParams),
  });

  // decrypts data from userData
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
