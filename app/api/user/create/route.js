import { amount } from "@/utils/API";
import prisma from "@/lib/prisma";
import { response } from "@/utils/API/response";

export async function POST(requests) {
  const { searchParams } = new URL(requests.url);

  let user = [];

  // for loop to create users based on query amount specified
  for (let i = 0; i < amount(searchParams); i++) {
    user.push({
      name: `user${i}`,
    });
  }

  // creates number of users in a database
  await prisma.user.createMany({
    data: user,
  });

  // counts records in a database
  const count = await prisma.user.count();
  // counts the length of users array
  const length = user.length;

  return response({
    message: "You have successfully created users in db",
    count,
    length,
    status: 200,
  });
}
