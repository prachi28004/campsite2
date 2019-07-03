var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");



var data=[
    {
        name:"himalaya Hills",
        image:"https://t4.ftcdn.net/jpg/00/76/56/11/240_F_76561157_uI2F9Eq7j7LfLhIveB70NEftLRjC8F0t.jpg",
        description:"The Himalayas, or Himalaya, form a mountain range in Asia, separating the plains of the Indian subcontinent from the Tibetan Plateau. The range has many of the Earth's highest peaks, including the highest, Mount Everest",
    },{
        name:"Doodha Hills",
        image:"https://prahaar.org.in/wp-content/gallery/himalay-camp/DSCF0928.jpg",
        description:"The Himalayas, or Himalaya, form a mountain range in Asia, separating the plains of the Indian subcontinent from the Tibetan Plateau. The range has many of the Earth's highest peaks, including the highest, Mount Everes"
    },{
        name:"Manali Hills",
        image:"https://thefinanser.com/wp-content/uploads/2019/03/Camp.jpg",
        description:"The Himalayas, or Himalaya, form a mountain range in Asia, separating the plains of the Indian subcontinent from the Tibetan Plateau. The range has many of the Earth's highest peaks, including the highest, Mount Everes"
    }
]

function seedDB(){
    //Remove all campgrounds
    campground.remove({})/*,function(err){
        if(err){
            console.log(err);
        }

            console.log("removed campgrounds");
            //add a few campgrounds
            data.forEach(function(seed){
                campground.create(seed,function(err,camp1){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a campground");
                    comment.create({
                        text:"this is the place which is greate,but wish..",
                        author:"potter Jack"
                    },function(err,comment1){
                        if(err){
                            console.log(err);
                        }
                        else{
                            camp1.comments.push(comment1);
                            camp1.save();
                            console.log("Created a comment");
                        }
                    })
                    }
                })
            })
    })*/
}

module.exports=seedDB;