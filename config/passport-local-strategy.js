const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');



//tell passport to use localstrategy
passport.use(new LocalStrategy({
        //always need to define usernameField with the one u use as username in schemma(one which is going to be unique)
        usernameField:'email'
    },
    function(email,password,done)
    {
        //find a user and establish identity
        User.findOne({
            //the first email is of schemma property defined by us, the second one is the one which function takes as argument
            email:email},function(err,user){
                if(err)
                {
                    console.log('Error in finding user -->Passport');
                    return done(err);
                }
                if(!user || user.password!=password){
                    console.log('Invalid Username/Password');
                    return done(null,false);
                }
                return done(null,user);
        });
    }
))

//serializing the user to decide which key is to be kept in the cookies
//basically after finding the user ,alloting cookie to it based on its id and then passport encrypts it automatically
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in finding user -->Passport');
            return done(err);
        }
        return done(null,user); 
    });
});

module.exports=passport;