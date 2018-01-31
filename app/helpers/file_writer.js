var fse = require("fs-extra");
var filePath = require('../constants/file_path.js')
var randomstring = require("randomstring");

const fileWriter = {}

fileWriter.writeProfileImage = function (base64, done) {
    var file_write = filePath;
    var base64_response = fileWriter.decodeBase64Image(base64);
    var image_name = randomstring.generate(12);
    fse.ensureDir(filePath, function (err) {
        if (err) {
            return callback(err);
        } else {
            fse.writeFile(file_write + "/" + image_name + "." + base64_response.type, base64_response.data, function (err) {
                if (err) {
                    return done(err);
                } else {
                    return done(null, file_write + "/" + image_name + "." + base64_response.type);
                }
            })
        }
    })
}
      

fileWriter.decodeBase64Image = function(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    var typeArray = matches[1].split("/");
    response.type = typeArray[1]; 
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
  }


  module.exports = fileWriter;