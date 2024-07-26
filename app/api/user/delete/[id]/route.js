import prisma from "@/app/lib/prisma";

/**
 * @swagger
 * /api/user/delete/{id}:
 *  delete:
 *   tags: [Users]
 *   summary: Deletes user from database
 *   description: Returns deleted user from database
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *          type: integer
 *      required: true
 *      description: id of the user that you want to delete
 *   responses:
 *    200:
 *      description: successfully deletes the user
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: Status message to reflecting deletion successfully
 *                example: Successfully deleted user
 *    404:
 *      description: user not found
 *    500:
 *      description: internal server error
 */
export async function DELETE(request, { params }) {
  const { id } = params;
  console.log("id2", id);

  try {
    let user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", status: 404 }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        },
      );
    }
    await prisma.user.delete({ where: { id: parseInt(id, 10) } });
    return new Response(
      JSON.stringify({ message: "Successfully deleted user" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message, status: 500 }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
