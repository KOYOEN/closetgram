import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      //본인 것만 검색
      if (args.me != undefined) {
        prisma.posts({
          where: {
            AND: [{ id: args.id }],
            OR: [
              { location_starts_with: args.term },
              { caption_starts_with: args.term }
            ]
          }
        });
      }
      //전체 검색
      else {
        prisma.posts({
          where: {
            OR: [
              { location_starts_with: args.term },
              { caption_starts_with: args.term }
            ]
          }
        });
      }
    }
  }
};
