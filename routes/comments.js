const express = require("express");
var router = express.Router({mergeParams:true});
var Post = require("../models/post");
var Comment = require("../models/comment");
var middleware = require("../middleware");



// ===================
//  COMMENT ROUTES
// ===================

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{post: post});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    //look up POST using ID
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            res.redirect("/posts");
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    req.flash("success","You have added a comment!")
                    res.redirect("/posts/"+ post.id);
                }
            });
        }
    });
});
    //COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if(err){
            res.redirect("back");
        } else {
           res.render("comments/edit",{post_id: req.params.id,comment: foundComment});
        }
    });
});

    //COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
          console.log(err);
      } else {
          res.redirect("/posts/" + req.params.id );
      }
   });
});
    //COMMENT DELETE
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
      if(err){
          console.log(err);
          res.redirect("back");
      }else{
          req.flash("success","Comment deleted!")
          res.redirect("/posts/" + req.params.id);
      }
  });
});


module.exports = router;