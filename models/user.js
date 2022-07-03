const mongoose=require('mongoose');

//setting multer not in config but in models as we would require differenetly for post,user,comments
//we could have a centralised one but this too is a good approach
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        //we would be keeping the path of the place where the image is stored here
        type:String,
    }
},
{
    timestamps:true,
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
      //__dirname is currently where we are+..+/uploads/users/avatars
      // this is the final path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const User=mongoose.model('User',userSchema);
module.exports=User;