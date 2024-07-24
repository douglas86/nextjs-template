import prisma from "@/app/lib/prisma";

/**
 * @swagger
 * /api/user:
 *  get:
 *      tags: [Users]
 *      summary: Fetches users from database
 *      description: Returns all users from database
 *      responses:
 *        200:
 *          description: users' information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                  $ref: "#/components/schemas/User"
 */
export async function GET(requests) {
  const { searchParams } = new URL(requests.url);
  const skip = parseInt(searchParams.get("skip"))
    ? parseInt(searchParams.get("skip"))
    : 0;
  const take = parseInt(searchParams.get("take"))
    ? parseInt(searchParams.get("take"))
    : 10;
  const data = await prisma.user.findMany({
    skip,
    take,
  });

  return new Response(JSON.stringify({ message: "ok", data }), {
    headers: { "Content-Type": "application/json" },
  });
}
