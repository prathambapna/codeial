const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');




//used for params and query in post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//use it before using routes as it belongs to view which is going to  be rendered in routes so before it gets rendered we neet to specify layout
app.use(expressLayouts);
//extract style and scripts from subpages into the layout after calling expresslayouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//setup the view engine
app.set('view engine','ejs');
app.set('views','./views')


//after setting the views,use session as middleware 
app.use(session({
    name:'codeial',
    //todo the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
        //100 min =>1000 millisec,60sec
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

//use express router(use before server starts  as middleware)
app.use('/',require('./routes'));

app.listen(port,function(error)
{
    if(error)
    {
        // console.log('Error:',err);
        // or
        console.log(`Error in running the server: $(error)`);
    }
    console.log(`Server is running on the port: ${port}`);

})