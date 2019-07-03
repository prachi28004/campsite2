var express=require("express");
var router=express.Router();
campground=require("../models/campground")
var middleware=require("../middleware")


//-----------INDEX-show all campgrounds---------
router.get("/",function(req,res){
   //get all compunds from DB
   campground.find({},function(err,allyelp){
       if(err){
           console.log(err);
       }else{
        res.render("campground/index",{c1:allyelp,currentuser:req.user});
       }
   });
});
//--------------CREATE -add new campground to DB---
router.post("/",middleware.isloggedin,function(req,res){
    
    //get data from form and add to the compund array
    var name=req.body.qname;
    var image=req.body.qimage;
    var price=req.body.qprice;
    var desc=req.body.qdesc;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var c2={name:name,price:price,image:image,description:desc,author:author};
    
    campground.create(c2,function(err,newc2){
        if(err){
            console.log(err);
        }else{
            //redirect back to campground page
            req.flash("info","You have successfuly created the new Campground")
             res.redirect("/campgrounds");
        }
    })
})

//NEW-show form to create new campground
router.get("/new",middleware.isloggedin,function(req,res){
    
    res.render("campground/new");
})


///--------show page-
router.get("/:id",function(req,res){
     //find the campground with provided ID
     campground.findById(req.params.id).populate("comments").exec(function(err,fcamp){
         if(err){
             console.log(err);
         }
         else{
             res.render("campground/show",{camp2:fcamp});
         }
     });
});
//======Edit Routes========

router.get("/:id/edit",middleware.checkCampgroundOwner,function(req,res){
    campground.findById(req.params.id,function(err,fcamp){
        res.render("campground/edit",{ecamp:fcamp})
    })
   
})



router.put("/:id/edit",middleware.checkCampgroundOwner,function(req,res){
    var name=req.body.qname;
    var image=req.body.qimage;
    var desc=req.body.qdesc;
    var price=req.body.qprice;
    var c2={name:name,price:price,image:image,description:desc};
    campground.findByIdAndUpdate(req.params.id,c2,function(err,upcamp){
        if(err){
            console.log(err);
        }
            else{
                res.redirect("/campgrounds/"+req.params.id);
            }
    })
})


//Destroy Campground Route========
router.delete("/:id",middleware.checkCampgroundOwner,function(req,res){
   campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
    })
})

module.exports=router;