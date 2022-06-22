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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            //since we also need to delete comment from the comments array of that particular post
            let postId=comment.post;
            comment.remove();
            //update by pull out from comments array the id with req.params.id that is comment id
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}