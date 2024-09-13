import prisma from "@/lib/prisma";
import { response } from "@/utils/API/response";

/**
 * Deletes user based on ID
 * @param request
 * @param params
 * @returns {Promise<Response>}
 * @constructor
 */
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    let user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return response({ message: "no user found", status: 404 });
    }

    await prisma.user.delete({ where: { id: parseInt(id, 10) } });

    return response({ message: "Successfully deleted user", status: 200 });
  } catch (e) {
    return response({ message: e.message, status: 500 });
  }
}
