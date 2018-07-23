var mongoose = require("mongoose");
 
var postSchema = new mongoose.Schema({
   artist: String,
   title: String,
   image: String,
   description: String,
   tags: [
      {
         type: String,
         ref:"tag"
         
      }],
   author:{
      id : {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Post", postSchema);
