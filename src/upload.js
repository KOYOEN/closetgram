import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  //    const {
  //        picture: { path }
  //    } = req;
  //    res.json({ path });
  console.log(req);
};
