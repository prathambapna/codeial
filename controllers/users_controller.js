//importing model
const User=require('../models/user');

module.exports.profile=function(req,res){
    res.render('profile',{
        title:'User-profile'
    });
}

//render the sign up page
module.exports.signUp=function(req,res){

    //we only want user to access signup page when not signed in that is not authenticated
    //otherwise redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the signup data
module.exports.create=function(req,res)
{
    //if password not equal to confirm password
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in signing up');return;}

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log('error in signing up');return;}
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
} 

//create session for sign in
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
} 