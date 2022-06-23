const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        //req.body.post as we hv given name as post in input with type hidden
        let post=await Post.findById(req.body.post)
        if(post)
        {
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            //updating the posts schema as well that is pushing the comment in the comments array
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    }catch(err)
    {
        console.log('Error',err);
    }
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            //since we also need to delete comment from the comments array of that particular post
            let postId=comment.post;
            comment.remove();
            //update by pull out from comments array the id with req.params.id that is comment id
            let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log('Error',err);
    }
}