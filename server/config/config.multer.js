var multer = require('multer');

module.exports = function(app) {
  console.log("multer!")

  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads');
    },
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({
    storage: storage
  }).single('userPhoto');

}