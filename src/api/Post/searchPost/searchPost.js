import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      //본인 것만 검색
      if (args.username != undefined) {
        return prisma.posts({
          where: {
            AND: [{ user: { username: args.username } }],
            OR: [
              { location_contains: args.term },
              { caption_contains: args.term }
            ]
          }
        });
      }
      //전체 검색
      else {
        return prisma.posts({
          where: {
            OR: [
              { location_contains: args.term },
              { caption_contains: args.term }
            ]
          }
        });
      }
    }
  }
};
