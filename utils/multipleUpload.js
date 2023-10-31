const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images/uploads/');
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '.png');
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const multipleUpload = multer({ storage: storage }).array('images', 4)

module.exports = multipleUpload
