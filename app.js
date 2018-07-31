var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Post = require('./models/post'),
    Comment = require('./models/comment'),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds");


//Routes

const commentRoutes    = require("./routes/comments"),
      postRoutes = require("./routes/posts"),
      indexRoutes      = require("./routes/index");

        //CONFIG LINES//
        
    //Mongoose DB connect
    //LOCAL DEVELOPMENT DB
mongoose.connect('mongodb://localhost/music_morsels');
    //CLOUD PRODUCTION DB
//mongoose.connect('mongodb://faultde:password321@ds147451.mlab.com:47451/songbird');

    //Set FILETYPE EJS
app.set('view engine', "ejs");
    //JSON PARSER
app.use(bodyParser.urlencoded({extended:true}));
    // Method Overide
app.use(methodOverride("_method"));
    // Connect-Flash
app.use(flash());
    //Stylesheet Link
app.use(express.static(__dirname + "/public"));


//seedDB();


    //Passport Config 
app.use(require("express-session")({
    secret: "This can be literally anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//global variables
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

    //Route Locations
app.use(indexRoutes);
app.use("/posts/:id/comments",commentRoutes);
app.use("/posts",postRoutes);

    //Server Listener
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('SongBird Server has started');
});