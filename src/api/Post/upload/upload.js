import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        caption,
        files,
        location,
        linkCaptions,
        pointXs,
        pointYs,
        links
      } = args;
      const post = await prisma.createPost({
        caption,
        location,
        user: { connect: { id: user.id } }
      });
      files.forEach(async file => {
        await prisma.createFile({
          url: file,
          post: {
            connect: {
              id: post.id
            }
          }
        });
      });
      links.forEach(async (index, link) => {
        await prisma.createLinktag({
          post: {
            connect: {
              id: post.id
            }
          },
          caption: linkCaptions[index],
          pointX: pointXs[index],
          pointY: pointYs[index],
          link: link
        });
      });
      return post;
    }
  }
};
