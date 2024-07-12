import {prisma} from "@/app/lib/prisma";

export const getData = () => {
    return prisma.user.findMany()
}