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
export async function GET(req, res) {
  const data = await prisma.user.findMany();
  return new Response(JSON.stringify({ message: "ok", data }), {
    headers: { "Content-Type": "application/json" },
  });
}
