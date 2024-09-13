import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export const DELETE = async () => {
  // Find the first user
  const firstUser = await prisma.user.findFirst({
    orderBy: {
      id: "asc",
    },
  });

  if (!firstUser) {
    return NextResponse.json({ message: "no user found", status: 404 });
  }

  // Delete all users except the first one
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      id: {
        not: firstUser.id,
      },
    },
  });

  return NextResponse.json({
    message: `Deleted ${deletedUsers.count} users except the first one.`,
    status: 200,
  });
};
