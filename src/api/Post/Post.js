import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    linktags: ({ id }) => prisma.post({ id }).linktags(),
    isLiked: (parent, _, { request }) => {
      //요청자의 정보
      const { user } = request;
      //post의 id
      const { id } = parent;
      //like내의 id에 요청자(user)의 id가 있느냐 있으면 그것의 user가 like
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
