const express = require("express");
var router = express.Router();
var Post = require("../models/post");
var middleware = require("../middleware");





// ===================
//  Post ROUTES
// ===================

router.get("/", (req,res)=>{
    //Get all Post from DB
        Post.find({},(err,allPost)=>{
            if(err){
                console.log(err);
            }
            else{
    // display Post from DB on webpage                
                res.render("posts/index",{post:allPost});
            }
        });

       
    });
    
 //Create - Create new campground
router.post('/',middleware.isLoggedIn,(req,res)=>{
  
    //get data from form
    var artist = req.body.artist;
    var image = req.body.image;
    var title = req.body.title;
    var rating = req.body.rating;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    };
    var newPost = {artist: artist,title: title ,image: image, rating: rating, description: desc, author:author};
    
    //create new campground
    Post.create(newPost,(err,newPost)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(newPost.title + " has been added.");
    //redirect to Post page
             res.redirect('/posts');
        }
    });
});


router.get('/new',middleware.isLoggedIn,(req,res)=>{
    res.render("posts/new");
});

// SHOW - more details

router.get("/:id", (req,res)=>{
    //find the post with provided id
    Post.findById(req.params.id).populate("comments").exec(function(err,foundPost){
        if(err){
            console.log(err);
        }else{
            res.render("posts/show",{post: foundPost});
        }
    });
});

//=============//
 //UPDATE ROUTE//
//=============//

// EDIT Post
router.get("/:id/edit",middleware.checkPostOwnership,(req,res)=>{
      Post.findById(req.params.id,function(err,foundPost){
        res.render("posts/edit", {post:foundPost});  
      });
});

router.put("/:id",middleware.checkPostOwnership,(req,res)=>{
    //find and update correct post
    Post.findByIdAndUpdate(req.params.id,req.body.post,(err,updatedPost)=>{
        if(err){
            res.redirect("/posts");
        }else{
            res.redirect("/posts/"+ req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id",middleware.checkPostOwnership,(req,res)=>{
  Post.findByIdAndRemove(req.params.id,(err)=>{
      if(err){
          res.redirect("/posts");
      }else{
          res.redirect("/posts");
      }
  });
});



module.exports = router;