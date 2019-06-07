const GoogleStrategy=require("passport-google-oauth2");
const passport =require("passport");
const connection = require('../db/models/connection');
const logger=require("../utils/logger");
const user =require("../db/models/schema")
//this will call when u write a cookie
passport.serializeUser((user,done)=>{
    var error = null;
    done(error,user);
});
//read data from coockie
passport.deserializeUser((userid,done)=>{
    console.log("user session",userid);
    user.findById(userid).then(user=>{
        done(null,user);
    })
})
//google strategy
passport.use(new GoogleStrategy({
    callbackURL:'http://localhost:3000/dashboard',
    clientID:'',
    clientSecret:''
},(accessToken,refreshToken,profile,done)=>{
console.log("callbak google...",profile,"Token",accessToken);
logger.debug("callbak google...",profile,"Token",accessToken)
//null= no error
// var userObject = {
//     googleId:profile.id,
//     username:profile._jason.name,
//     picture:profile._jason.picture,
//     email:profile._jason.email[0]

// };
console.log("profile photos******************************************",profile._json.picture);
user.findOne({googleId:profile.id}).then(currentUser=>{
    if(currentUser){
        console.log("user exist");
        done(null,currentUser);//call serialize
        logger.debug('Inside  findOne' +currentUser);
    }
    else{
        var userObject =new user({
        username:profile.displayName,
        googleId:profile.id,
        pic:profile._json.picture,
        email:profile.email,
        
        });
        userObject.save().then(newUser=>{
            console.log("New user Added...");
            // let mail= require()
            // mail('account has been creted successfully',{
            //     username:profile.displayName,
            //     googleId:profile.id,
            //     pic:profile.json.picture,
            //     email:profile.email,
            // })
            done(null,newUser);
            logger.debug('Inside googlePsassport .save '+newUser);
        })
    }
})
// done(null,userObject); 
}));
