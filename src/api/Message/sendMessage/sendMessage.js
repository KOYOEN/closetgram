import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            //roomId와 toId는 동시에 들어올 일이 없다.
            //새로운 대화를 시작하는 경우 
            if (roomId === undefined) {
                if (user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: { connect: [{ id: toId }, { id: user.id }] }
                    }).$fragment(ROOM_FRAGMENT);
                }
            }//기존 대화방을 이용하는 경우
            else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("Room not found");
            }
            const getTo = room.participants.filter(
                participant => participant.id !== user.id
            )[0];
            //roomId가 있으면 기존의 것 이용, toId가 있으면 새로운 방을 생성하여 사용.
            return prisma.createMessage({
                text: message,
                from: { connect: { id: user.id } },
                to: { connect: { id: roomId ? getTo.id : toId } },
                room: { connect: { id: room.id } }
            });
        }
    }
};