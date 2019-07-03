var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    flash=require("connect-flash");
    campground=require("./models/campground"),
    seedDB=require("./seeds");//"./" searches the file in th esame directory
    comment=require("./models/comment")
    passport=require("passport"),
    localstrategy=require("passport-local")
    user=require("./models/user"),
    methodoverride=require("method-override");


var commentroutes=require("./routes/comment"),
    campgroundtroutes=require("./routes/campground"),
    indexroutes=require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp_v12")
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({ectended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodoverride("_method"));
app.use(flash());
//========
//==PASSPORT COMFIGURATION====
//=================================
app.use(require("express-session")({
    secret:"Something is really Amazing",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//to grab the user's information and check whether its logged in or not
app.use(function(req,res,next){//this variables can be used in views-ejs without rendering the or passing them along with 
    //pages like in new,show,edit ...etc 
    res.locals.currentuser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    res.locals.info=req.flash("info");
    next();
});
  

app.use("/campgrounds/:id/comments",commentroutes);
app.use("/campgrounds",campgroundtroutes);
app.use(indexroutes);


app.listen(3030,function () {
    console.log("Server has started");
});