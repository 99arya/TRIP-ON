var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware
var middlewareObj={};
    middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            //does the user own the campground?
             Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does the user own the camp
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {                
                    req.flash("error", "You are not the owner of this campground post!");

                    
                    res.redirect("back");
                }
                
            }
        });
        
        } else {
            req.flash("error", "You need to be logged in to do that")
            res.redirect("back");
        }
    };
    
    middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            //does the user own the comment
             Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                //does the user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "It's not your post!");
                    res.redirect("back");
                }
                
            }
        });
        
        } else {
            req.flash("error", "You need to be logged in to that!");
            res.redirect("back");
        }
    }
    
    middlewareObj.isLoggedIn = function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      } else {
          req.flash("error", "You need to be logged in to do that!")
          res.redirect("/login");
      }
  };
  
    


module.exports = middlewareObj;