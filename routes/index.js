const express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



// ===================
//  INDEX ROUTE
// ===================

router.get('/', function(req,res){
    res.render('landing');
});

// ===================
//  AUTH ROUTES
// ===================

// show register form
router.get("/register",(req,res)=>{
    res.render("register");
});

// submit new user
router.post("/register",(req,res)=>{
    var username = new User({username: req.body.username});
    var pwd = req.body.password;
    User.register(username,pwd,(err,user)=>{
        if(err){
         
            console.log(err);
            return res.render("register",{"error": err.message});
        }
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to Music Morsels " + user.username)
            res.redirect("/posts");
        });
    });
});

// show login form
router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/posts",
    failureRedirect: "/login"
}),(req,res)=>{
    req.flash("error","Something went wrong :(")
});

// logout route
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","You have logged out")
    res.redirect("/posts");
});



module.exports = router;