var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment   = require("./models/comment");

var data = [
    {
        title: "Daughters", 
        artist: "Daughters",
        image: "https://upload.wikimedia.org/wikipedia/en/9/9a/DaughtersSelfTitled.jpg",
        description:'blah blah blah',
        tags: ["metal","heavy","experimental"],
        status:true
   }
        
    , 
    {
        title: "I Forget Where We Were", 
        artist: "Ben Howard",
        image: "https://cps-static.rovicorp.com/3/JPG_500/MI0003/798/MI0003798962.jpg?partner=allrovi.com",
        description: "blah blah blah",
        tags: ["indie","heavy","acoustic"],
        status:true
        
   }
        
    ,
     {
        title: "Awake", 
        artist: "Trash Talk",
        image: "https://img.discogs.com/nz81M0Wcbs2HOJr8HAtPKDH4QA4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3107971-1316128217.jpeg.jpg",
        description: "blah blah blah",
        tags: ["punk","heavy","thrash"],
        status:true
    },
     {
        title: "good kid, m.A.A.d City", 
        artist: "Kendrick Lamar",
        image: "https://images-na.ssl-images-amazon.com/images/I/51Zzc7PUDML._SY355_.jpg",
        description: "blah blah blah",
        tags: ["rap","heavy","hip-hop"],
        status:true
    },
    {
        title: "I'm The Man,  Who Will Find You", 
        artist: "Connan Mockasin",
        image: "https://media.pitchfork.com/photos/5929a475b1335d7bf169897e/1:1/w_320/657e4d25.jpg",
        description: "blah blah blah",
        tags: ["funk","soft","psychadelic"],
        status:true
    },
     {
        title: "Battlefields Forever", 
        artist: "Big Business",
        image: "https://f4.bcbits.com/img/a1067082796_5.jpg",
        description: "blah blah blah",
        tags: ["metal","loud","sludge"],
        status:true
    },
    {
        title: "TA1300", 
        artist: "Denzel Curry",
        image: "https://images.pigeonsandplanes.com/images/c_limit,f_auto,fl_lossy,q_auto,w_1030/hboceur1hbayoeisqeki/denzel-curry-ta13oo-album-art",
        description: "blah blah blah",
        tags: ["rap","heavy","trap"],
        status:true
    },
    {
        title: "1999 WILDFIRE", 
        artist: "BROCKHAMPTON",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfKxkh3D9yP4NBVeOTq06abhqG2TbOuoDX4KQm8vgWhwgkQVU",
        description: "blah blah blah",
        tags: ["rap","smooth","R&B"],
        status:true
    }
    
];

function seedDB(){
   //Remove all Post
   Post.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed previous post");
         //add default posts
        data.forEach(function(seed){
            Post.create(seed, function(err, post){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a posts");
                    //remove comments
                    Comment.remove(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("All comments removed");
                        }
                    });
                }
            });
        });
    }); 

}

module.exports = seedDB;