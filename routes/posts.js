const express = require("express");
var router = express.Router();
var Post = require("../models/post");
var middleware = require("../middleware");





// ===================
//  Post ROUTES
// ===================

router.get("/", (req,res)=>{
    var currentUser = req.user;
    //User VIEW
    if(req.isAuthenticated()){
        console.log("USER View Enabled");
        //if search
            if(req.query.search){
                const regex = new RegExp(escapeRegex(req.query.search),'gi');
                //get all post with
                 Post.find({
                     $or : [
                        {  $and: [{ title : regex },{status: false}] },
                        {  $and: [{ artist : regex },{status: false}] },
                        {  $and: [{ tags : regex },{status: false}]  }
                            ]
                 },(err,allPost)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                    // display Post from DB on webpage                
                    res.render("posts/index",{post:allPost,currentUser:currentUser});
                        }
                    });
                            }
            else{
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
                }
    
}else  //PEASANT VIEW
{   
    console.log("Peasant View Enabled");
    //if search
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search),'gi');
        //get all post with
         Post.find({
             $or : [
                {  $and: [{ title : regex },{status: true}] },
                {  $and: [{ artist : regex },{status: true}] },
                {  $and: [{ tags : regex },{status: true}]  }
                    ]
         },(err,allPost)=>{
            if(err){
                console.log(err);
            }
            else{
    // display Post from DB on webpage                
                res.render("posts/index",{post:allPost});
            }
        });
    }
    else{
        //Get all Post from DB
        Post.find({status: true
            
        },(err,allPost)=>{
            if(err){
                console.log(err);
            }
            else{
    // display Post from DB on webpage                
                res.render("posts/index",{post:allPost});
            }
        });
    }
}
       
    });
    
 //Create - Create new Post
router.post('/',middleware.isLoggedIn,(req,res)=>{
  
    //get data from form
    var artist = req.body.artist;
    var image = req.body.image;
    var title = req.body.title;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    };
    
    var tags = req.body.tags;
    var tagArr = tags.split(",");




    var newPost = {artist: artist,title: title ,image: image, description: desc, author:author, tags:tagArr};
    
    //create new POST
    Post.create(newPost,(err,newPost)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(newPost.title + " has been added.");
            console.log(newPost.tags);
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

// EDIT Post add back ownership
router.get("/:id/edit",middleware.checkPostOwnership,(req,res)=>{
        
    
      Post.findById(req.params.id,function(err,foundPost){
          if(err){
             console.log(err);
          }
          else{
        res.render("posts/edit", {post:foundPost});  
          }
        
      });
      
});

router.put("/:id",middleware.checkPostOwnership,(req,res)=>{
// Convert tag string into array
var postUpdate = req.body.post;
var newArr = postUpdate.tags.split(",");
postUpdate.tags = newArr;
console.log(postUpdate.tags);

    //find and update correct post
    Post.findByIdAndUpdate(req.params.id,postUpdate,(err,updatedPost)=>{
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



module.exports = router;