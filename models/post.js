const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //here linking with user schema as post would be done by a user
    user:{
        //type=in robo3t u can see each user has objectid we will make of that type
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;