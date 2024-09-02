import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const GET = async () => {
  const yamlFilePath = path.join(process.cwd(), "public", "swagger.yaml");
  const yamlContent = await fs.readFile(yamlFilePath, "utf8");
  return new NextResponse(yamlContent, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
