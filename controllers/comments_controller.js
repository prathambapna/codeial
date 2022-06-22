const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
    //req.body.post as we hv given name as post in input with type hidden
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){

                //updating the posts schema as well that is pushing the comment in the comments array
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    })
}