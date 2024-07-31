import prisma from "@/lib/prisma";
import { skip, take } from "@/utils/API";
import { response } from "@/utils/API/response";

/**
 * @swagger
 * /api/user:
 *  get:
 *    tags: [Users]
 *    summary: Fetches users from database
 *    description: Returns all users from database
 *    parameters:
 *      - in: query
 *        name: skip
 *        required: false
 *        default: 0
 *        description: Number of results to skip before starting to collect the results to set.
 *      - in: query
 *        name: take
 *        required: false
 *        default: 10
 *        description: Number of results to take before starting to collect the results to take.
 *    responses:
 *      200:
 *        description: users' information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Status message reflecting the outcome of the request
 *                  example: ok
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/User"
 *                    description: Array of returned user objects.
 *                length:
 *                  type: integer
 *                  description: Total count of user objects present in the database.
 *                  example: 4
 */
export async function GET(requests) {
  const { searchParams } = new URL(requests.url); // This will get the queries from the url that is passed

  const length = await prisma.user.count();
  const data = await prisma.user.findMany({
    skip: skip(searchParams),
    take: take(searchParams),
  });

  return response({ message: "ok", data, length });
}
