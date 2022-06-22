const express=require('express');
const router=express.Router();
const passport=require('passport');
const commentsController=require('../controllers/comments_controller');


//check if user is authenticated then only create post
router.post('/create',passport.checkAuthentication,commentsController.create);
module.exports=router;