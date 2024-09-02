import { NextResponse } from "next/server";

export const GET = async () =>
  await NextResponse.json({ message: "Server running", status: 200 });
