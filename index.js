const express=require('express');
const app=express();
const port=8000;

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