const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.png');
  },
});

const upload = multer({ storage: storage }).single('image');
//console.log(upload)
module.exports = upload
