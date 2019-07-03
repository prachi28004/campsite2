
var campground=require("../models/campground");

var comment=require("../models/comment");

var user=require("../models/user");

//all the middleware goes here
var middlewareObject={};

//=======middleware for checking ==========
middlewareObject.checkCampgroundOwner=function (req,res,next){
    if(req.isAuthenticated())///if user id logged in
     {
        campground.findById(req.params.id,function(err,ecamp){
            if(err){
                req.flash("error","Campground not Found")
                res.redirect("back");
            }
            else{
                //does user own the campground 
               if(ecamp.author.id.equals(req.user.id)){
                next();
               }
               else{
                   req.flash("error","You do not have permission")
                   res.redirect("back");
               }
           }
        })
     }else{
         res.redirect("back");
     }
                         
       //otherwise redirect
    //if nor,redirect
}

//===========for comment================
middlewareObject.checkCommentOwner=function(req,res,next){
    if(req.isAuthenticated())///if user id logged in
     {
        comment.findById(req.params.comment_id,function(err,ecmt){
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the campground 
               
               if(ecmt.author.id.equals(req.user.id)){
                    next();
               }
               else{
                   req.flash("error","you don't havr permission")
                   res.redirect("back");
               }
           }
        })
     }else{
         req.flash("error","You need to be logged in to do that !!!");
         res.redirect("back");
     }
                         
       //otherwise redirect
    //if nor,redirect
}

//================for logging ===========
middlewareObject.isloggedin=function(req,res,next){
    if(req.isAuthenticated()){
         return  next();    //here next refers to the cal function in the secret-page
    }
    req.flash("error","Please Login First");
    res.redirect("/login");
}


module.exports=middlewareObject