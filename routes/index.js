var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user")



router.get("/",function(req,res){
    res.render("landing");
})

//Show register form
router.get("/register",function(req,res){
    res.render("register");
});

//to register the user
router.post("/register",function(req,res){
    var newuser=new user({username:req.body.username});
    user.register(newuser,req.body.password,function(err,user){
        if(err){
            //req.flash("error",err) -we get [object][object] 
            req.flash("error",err.message)//this well get us the message 
            //corresponding to the type of error
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to Yelpcamp  "+ user.username.toUpperCase())
            res.redirect("/campgrounds");
        })
    })
})
//to show th wlogin form
router.get("/login",function(req,res){
    res.render("login");

})

//to login the user by taking the credentials
//app.post("/login",middleware,callback)--here middleware checks the credentials(input-username,password)
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
})

//to logout 
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","You have logged out !!");
    res.redirect("/campgrounds")
})

module.exports=router;