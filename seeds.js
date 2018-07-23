var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment   = require("./models/comment");
var ObjectId = String;

var data = [
    {
        title: "Daughters", 
        artist: "Daughters",
        image: "https://upload.wikimedia.org/wikipedia/en/9/9a/DaughtersSelfTitled.jpg",
        description:'<iframe src="https://open.spotify.com/embed/album/1xYjZUrVUjcUPnpdnHD9nf" width="500" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        tags: ["metal","heavy"],
        author: {
      id :  ObjectId(123),
      username: "Zach"
   }
        
    }, 
    {
        title: "I Forget Where We Were", 
        artist: "Ben Howard",
        image: "https://cps-static.rovicorp.com/3/JPG_500/MI0003/798/MI0003798962.jpg?partner=allrovi.com",
        description: "blah blah blah",
        tags: ["indie","heavy"],
        author: {
      id :  ObjectId(123),
      username: "Zach"
   }
        
    },
     {
        title: "Awake", 
        artist: "Trash Talk",
        image: "https://img.discogs.com/nz81M0Wcbs2HOJr8HAtPKDH4QA4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3107971-1316128217.jpeg.jpg",
        description: "blah blah blah",
        tags: ["punk","heavy"],
        author: {
      id :  ObjectId(123),
      username: "Zach"
   }
    },
     {
        title: "good kid, m.A.A.d City", 
        artist: "Kendrick Lamar",
        image: "https://images-na.ssl-images-amazon.com/images/I/51Zzc7PUDML._SY355_.jpg",
        description: "blah blah blah",
        tags: ["rap","heavy"],
       author: {
      id :  ObjectId(123),
      username: "Zach"
   }
    },
]

function seedDB(){
   //Remove all Post
   Post.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Post.create(seed, function(err, post){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a posts");
                    //create a comment
                    Comment.remove(function(err){
                        if(err){
                            console.log("remove gone wrong")
                        }else{
                            console.log("All comments removed")
                            
                    
                        }
                    });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;