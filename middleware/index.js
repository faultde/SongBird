
const Post = require("../models/post");
const Comment = require("../models/comment");

const middlewareObj= {};

middlewareObj.checkPostOwnership = function(req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
      Post.findById(req.params.id,function(err,foundPost){
          if(err){
              req.flash("error", "Post not found.")
              res.redirect("back");
          } else {
              //does user own post
            if(foundPost.author.id.equals(req.user.id)){
                  next();
            } else {
                req.flash("error","You dont have permission to do that!")
                res.redirect("back");
             }
            }
          });
        
    }else{
        req.flash("error","You need to be logged in to do that!")
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id,function(err,foundComment){
          if(err){
              res.redirect("back");
          } else {
              //does user own comment?
            if(foundComment.author.id.equals(req.user.id)){
                  next();
            } else {
                req.flash("error","You dont have permission to do that!")
                res.redirect("back");
             }
            }
          });
        
    }else{
        req.flash("error","You need to be logged in to do that!")
        res.redirect("back");
        
        
    }
    
    
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
    
};

module.exports = middlewareObj;