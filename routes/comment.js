var express=require("express");
var router=express.Router({mergeParams:true});
var campground=require("../models/campground");
var comment=require("../models/comment");
var middleware=require("../middleware")
//===============
//=COMMENT ROUTING==
//====================


//------------------form to create thr form
router.get("/new",middleware.isloggedin,function(req,res){
    campground.findById(req.params.id,function(err,fcamp3){
        if(err){
            console.log(err);
        }else{
            res.render("comment/new",{camp3:fcamp3})
        }
    })
})

//to add th ecomment t the perticular campground

router.post("/",middleware.isloggedin,function(req,res){
   
    //lookup campground using ID
    campground.findById(req.params.id,function(err,fcamp4){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            comment.create(req.body.comment,function(err,cmt2){
                if(err){
                    req.flash("error","Something went wrong !!!")
                    console.log(err);
                }
                else{
                    //add user name and id to the comment
                    cmt2.author.id=req.user._id;
                    cmt2.author.username=req.user.username;
                    //save comment
                    cmt2.save();
                    fcamp4.comments.push(cmt2);
                    fcamp4.save();
                    req.flash("success","Successfully added the Comment !!!")
                    res.redirect("/campgrounds/"+req.params.id)
                }
                
            })
        }
    })
})
//========Comments Edit Route===========
router.get("/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
    comment.findById(req.params.comment_id,function(err,fcmt){
        if(err){
             console.log(err);
        }
        else{
            res.render("comment/edit",{cmt2:fcmt,camp_id:req.params.id});
        }
    })
    
})

router.put("/:comment_id",middleware.checkCommentOwner,function(req,res){
     comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,icamp){
         if(err){
             console.log(err);
             res.redirect("back");
         }
         else{
           res.redirect("/campgrounds/"+req.params.id);
         }
   })

})

//===comment Destroy Route========
router.delete("/:comment_id",middleware.checkCommentOwner,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

module.exports=router;