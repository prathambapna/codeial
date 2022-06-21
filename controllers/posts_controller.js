const Post=require('../models/post');
module.exports.create=function(req,res)
{
    Post.create({
        //we have got the post schema above
        //now can access content,user
        //here user._id (can refer in robo3t)
        //req.body.content is bcoz we hv given name of form as content
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating post');return;}
        return res.redirect('back');
    })
}