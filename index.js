const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for params and query in post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//use it before using routes as it belongs to view which is going to  be rendered in routes so before it gets rendered we neet to specify layout
app.use(expressLayouts);
//extract style and scripts from subpages into the layout after calling expresslayouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router(use before server starts  as middleware)
app.use('/',require('./routes'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views')

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