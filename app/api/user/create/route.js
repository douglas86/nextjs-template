import { amount } from "@/utils/API";
import prisma from "@/lib/prisma";
import { response } from "@/utils/API/response";

/**
 * @swagger
 * /api/user/create:
 *  post:
 *    tags: [Users]
 *    summary: Creates a number of users in database
 *    description: Returns message, count, length and status
 *    parameters:
 *      - in: query
 *        name: amount
 *        required: false
 *        default: 10
 *        description: Creates the number of users in db that you specify
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
 *                  description: Message on success
 *                  example: You have successfully created users in db
 *                count:
 *                  type: number
 *                  description: Counts how many users are in database
 *                  example: 10
 *                length:
 *                  type: number
 *                  description: Shows the amount of users that were just created
 *                  example: 2
 *                status:
 *                  type: number
 *                  description: Shows that creation was successfully
 *                  example: 200
 */
export async function POST(requests) {
  const { searchParams } = new URL(requests.url);

  let user = [];

  // for loop to create users based on query amount specified
  for (let i = 0; i < amount(searchParams); i++) {
    user.push({
      name: `user${parseInt(await prisma.user.count()) + i}`,
    });
  }

  // creates number of users in a database
  await prisma.user.createMany({
    data: user,
  });

  const count = await prisma.user.count();
  const length = user.length;

  return response({
    message: "You have successfully created users in db",
    "users in database": count,
    "created users": length,
    status: 200,
  });
}
