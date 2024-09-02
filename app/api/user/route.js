import prisma from "@/lib/prisma";
import { skip, take } from "@/utils/API";
import { NextResponse } from "next/server";

export const GET = async (requests) => {
  const { searchParams } = new URL(requests.url);

  const length = await prisma.user.count();
  const data = await prisma.user.findMany({
    skip: skip(searchParams),
    take: take(searchParams),
  });

  return NextResponse.json({ message: "ok", data, length });
};
