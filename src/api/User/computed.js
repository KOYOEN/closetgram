import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        //찾아 들어간 내가 request, 확인중인 대상이 parent 왜냐하면 그 사람의 정보에서 amIFollowing이 실행되었기 때문에
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [{ id: user.id }, { following_some: {id: parentId} }]
                });
            } catch {
                return false;
            }   
        },
        isSelf: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};