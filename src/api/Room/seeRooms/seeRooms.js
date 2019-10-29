import { prisma } from "../../../../generated/prisma-client";
import { userInfo } from "os";

export default {
    Query: {
        seeRooms: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.rooms({
                where: { participants_some: { id: user.id } }
            });
        }
    }
}