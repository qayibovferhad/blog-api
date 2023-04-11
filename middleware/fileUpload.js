const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const filePartName = file.originalname.split(".");
    const exc = filePartName[filePartName.length - 1];
    const uniqiue = Date.now() + "-" + Math.random(Math.random() * 10000);
    cb(null, uniqiue + "." + exc);
  },
});
const upload = multer({ storage });
module.exports = upload;
