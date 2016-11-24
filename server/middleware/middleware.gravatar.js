var gravatar = require('gravatar');
module.exports = function(){
  console.log("HERE IS GRAVATAR");
  console.log(gravatar);
  var myGrav = gravatar.url('abelmaniquis@gmail.com');
  console.log(myGrav);
};

