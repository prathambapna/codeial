/*
steps done 
1)npm init
2)setup folders->models,views,routes,controllers,config
3)npm install express(after this can check in package-json)
4)const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(error)
{
    if(error)
    {
        // console.log('Error:',err);
        // or
        console.log(`Error: $(error)`);
    }
    console.log(`Server is running on the port: ${port}`);
    
})

5)instead of nodemon index.js in terminal we can use
go in package json
under scripts add new tag "start":"nodemon index.js",
now instead of nodemon index.js use npm start

6)initialising git in terminal
git init

*/ 
const express=require('express');
const app=express();
const port=8000;

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