const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res)
{
    try{
        await Post.create({
            //we have got the post schema above
            //now can access content,user
            //here user._id (can refer in robo3t)
            //req.body.content is bcoz we hv given name of form as content
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err)
    {
        console.log('Error',err);
    }
}

//will be deleting according to action=> /posts/destroy/:id
//in params there would be id of post
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting the object id (._id) to string
        if(post.user==req.user.id)
        {
            post.remove();
            await Comment.deleteMany({
                post:req.params.id
            });
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log('Error',err);
    }
    
}