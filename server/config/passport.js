//config.passport.js

//Load the things we need
var LocalStrategy = require('passport-local').Strategy;
  //Load up the user model
  
var User = require('../api/user/user.model.js');

var Ralph = new User();
Ralph.local.name = "Ralph";
Ralph.local.password = "12345";
console.log(Ralph);

module.exports = function(passport){
  //Serialize user
  passport.serializeUser(function(user,done){
    done(null,user.id);
    console.log("USER ID");
  });
  
  //Deserialize user
  passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
  
  /*-------------
  LOCAL SIGNUP
  --------------*/
  //We are using named strategies for login and signup
  passport.use('local-signup',new LocalStrategy({
    usernameField:'name',
    passwordField: 'password',
    passReqToCallback: true //allows us to pass back the entire request to the callback
  },
  function(req, name, password, done){
    //Asynchronous
    //User.findOne wont fire unless data is sent back
    process.nextTick(function(){
    //Find a user whose name is the same as the forms email
      var userInfo = {'local.name': name}
      console.log(userInfo);
      User.findOne(userInfo,function(err,user){
        //If there  are any errors, return the error.
        if(err)
          return done(err);
          
          //Check to see if there's already a user with that email
        if(user){
          console.log("that name is already taken")
          return done(null,false);
        }else{
          //If there is no user with that name, 
          //create the user
          var newUser = new User();
          console.log("USER CREATED ");
          console.log(newUser);
          //Set the user's local credentials
          newUser.local.name = name;
          newUser.local.password = newUser.generateHash(password);
        
          //Save the user
          newUser.save(function(err){
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
    });
    });
  }));
  /*--------------------------
  LOCAL LOGIN:
  ---------------------------*/
  passport.use('local-login',new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqtoCallback: true //Allows us to pass back the entire request to the callback
  },
  function(req, name, password, done){  //callback with email and password from our form
    
    //find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({'local.name':name},function(err,user){
      
      //if there are any errors, return the error before anything else
      
      if(err)
        return done(err);
      //if no user is found, return th
      if(!user)
        return done(null, false,'No user found');
      //If the user is found but the password is wrong
      if(!user.validPassword(password))
        return done(null, false, 'Wrong Password');
      
      return done(null, user);
    });
  }));
console.log("END OF PASSPORT FUNCTION");  
};