Project:

Grove: For your world domination plans.
           Your own personal illuminati.
           Your own personal cabal.

A cabal is a group of people united in some close design together, 
usually to promote their private views or interests in a church, 
state, or other community, often by intrigue, usually unbeknown to 
persons outside their group.

Grove allows you and up to 9 other friends to plan and conspire
together. It's your own personal Illuminati!

Features will include:
   Exclusive membership:
          -Everyone in the group shares a single password. It's better for the sake of loyalty.
          -In fact, there are two passwords for you to join, your personal password, and a group password.
          -Your group is exclusive, you can only be part of one group at a time
   Chat:
          
VERSION 1:

For now, the app will simply be a chatroom that requires password access

--------------------------------
ADDITIONAL LIBRARIES
--------------------------------
morgan:
Morgan is an HTTP request logger middleware for Node.js. 
It simplifies the process of logging requests to your application.
It standardizes and automatically creates request request logs.

flash:

cookieParser:

express-session

configDB

Fix libraries


----------------------------
FOLDER STRUCTURE:
----------------------------
client
  views
  
Server
  rou
  
  
  
function(username, password, done) {
      //Asynchronous
      //User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        //Find a user whose name is the same as the forms email
        User.findOne({
          "local.username": username
        }, function(err, user) {
          //If there  are any errors, return the error.
          if (err){
            return done(err);
          }
          //Check to see if there's already a user with that email
          if (user){
            console.log("that name is already taken")
            return done(null, false);
          } else {
            //If there is no user with that name, 
            //create the user
            var newUser = new User();
            //Set the user's local credentials
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            //Save the user
            newUser.save(function(err) {
              if (err){
                throw err;}
              return done(null, newUser);
            });
          }
        });
      });
    }));