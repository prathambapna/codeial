const Post=require('../models/post');
const Comment=require('../models/comment');
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

//will be deleting according to action=> /posts/destroy/:id
//in params there would be id of post
module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object id (._id) to string
        if(post.user==req.user.id)
        {
            post.remove();
            Comment.deleteMany({
                post:req.params.id
            },function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}