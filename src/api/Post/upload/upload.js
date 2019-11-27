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
        links,
        isSale,
        isOpen
      } = args;
      const post = await prisma.createPost({
        caption,
        location,
        user: { connect: { id: user.id } },
        isOpen,
        isSale
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
      // if (links != undefined) {
      //   links.forEach(async (index, link) => {
      //     await prisma.createLinktag({
      //       post: {
      //         connect: {
      //           id: post.id
      //         }
      //       },
      //       caption: linkCaptions[index],
      //       pointX: pointXs[index],
      //       pointY: pointYs[index],
      //       link
      //     });
      //   });
      // }
      console.log(post);
      return post;
    }
  }
};
