const path = require('path')
const multer = require('multer')

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "public", "movies", "covers"));
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + String(Math.random() * 9999);
  
      // const hashedFilename = crypto
      //   .createHash("SHA256")
      //   .update(file.originalname)
      //   .digest("hex");
  
      const ext = path.extname(file.originalname);
      cb(null, fileName + ext);
    },
  });
  